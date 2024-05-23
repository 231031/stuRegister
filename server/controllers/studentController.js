import bcrypt from 'bcrypt';

import pool from '../dbcon.js';
const connection = await pool.getConnection();

export async function loginStudent(req, res) {
    try {
        let change = true;
        const { username, password } = req.body;
        const [stu] = await connection.execute('SELECT * FROM Student WHERE student_id = ?', [username]);
        connection.release();
        const user = stu[0];
        if (user === undefined) {
            return res.status(401).send({
                msg: "Username does not exist.",
            })
        }
        else {
            if (password === user.password) {
                change = false;
                return res.status(200).send({
                    msg: "Please change password and Fill personal information",
                    student_id: user.student_id,
                    department_id: user.department_id,
                    year: user.year,
                    setPass: change,
                })
            }
            bcrypt.compare(password, user.password)
                .then(match => {
                    if (!match) return res.status(400).send({ msg : "invalid password!" });
                    return res.status(200).send({
                        msg: "Login successful",
                        student_id: user.student_id,
                        department_id: user.department_id,
                        year: user.year,
                        setPass: change,
                    })
                })
        }

    } catch (error) {
        connection.release();
        return res.status(404).send({ error: error.message });
    }
}

export async function updatePassword(req, res) {
    try {
        const query = `
            UPDATE Student SET password = ? WHERE student_id = ?
        `
        const token = req.headers.authorization.split(" ")[1];
        if (token) {
            const hashPass = await bcrypt.hash(req.body.password, 10); // Hash the password
            await connection.execute(query, [hashPass, token]);
            connection.release();
            return res.status(200).send({ msg: 'Student updated successfully' });
        }

    } catch (error) {
        connection.release();
        return res.status(404).send({ error: error.message });
    }
}

export async function updateInfo(req, res) {
    try {

        const token = req.headers.authorization.split(" ")[1];
        const { gender, id_card, address, age, city, dob, email, f_age, f_email, f_first_name, f_id, f_last_name,
            f_phone, f_salary, m_age, m_email, m_first_name, m_id, m_last_name, m_phone, m_salary, phone, state, zip_code } = req.body;

        const fieldsToUpdate = {
            gender, id_card, address, age, city, dob, email, f_age, f_email, f_first_name, f_id, f_last_name,
            f_phone, f_salary, m_age, m_email, m_first_name, m_id, m_last_name, m_phone, m_salary, phone, state, zip_code
        };

        const definedFields = Object.fromEntries(Object.entries(fieldsToUpdate).filter(([key, value]) => value !== undefined));
        const setClause = Object.keys(definedFields)
            .map(key => `${key} = ?`)
            .join(', ');

        const query = `
            UPDATE Student
            SET ${setClause}
            WHERE student_id = ?;
        `;
        await connection.execute(query, [...Object.values(definedFields), token]);
        connection.release();
        return res.status(200).send({ msg: 'Student updated successfully' });

    } catch (error) {
        connection.release();
        return res.status(404).send({ error: error.message });
    }
}

export async function getInfo(req, res) {
    try {
        const query = `
            SELECT student_id, first_name, last_name, year, department_id, gender, dob, email, city, 
            zip_code, state, address, salary, phone, id_card, age, 
            f_age, f_email, f_first_name, f_id, f_last_name, f_phone, f_salary, 
            m_age, m_email, m_first_name, m_id, m_last_name, m_phone, m_salary
            FROM Student WHERE student_id = ?
        `
        const [user] = await connection.execute(query, [req.body.student_id]);
        connection.release();
        res.json(user[0]);
    } catch (error) {
        connection.release();
        return res.status(404).send({ error: error.message });
    }
}

export async function getStuTerm(req, res) {
    try {
        const query = `
            SELECT 
                ET.student_id,
                ET.year,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'term', ET.term,
                        'grade_term', ET.grade_term,
                        'course_term', courses.course_term
                    )
                ) AS register_term
            FROM 
                edu_term ET
            INNER JOIN (
                SELECT 
                    student_id,
                    year,
                    term,
                    JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'course_id', stu_register.course_id,
                            'course_name', course_name,
                            'grade', grade
                        )
                    ) AS course_term
                FROM 
                    stu_register
                INNER JOIN Course ON stu_register.course_id = Course.course_id
                GROUP BY 
                    student_id, year, term
            ) AS courses ON ET.student_id = courses.student_id 
                AND ET.year = courses.year 
                AND ET.term = courses.term
            WHERE 
                ET.student_id = ? 
                AND ET.year = ?
            GROUP BY 
                ET.student_id, ET.year;

        `
        const [regis] = await connection.execute(query, [req.body.student_id, req.body.year]);
        connection.release();
        res.json(regis[0]);
    } catch (error) {
        connection.release();
        return res.status(404).send({ error: error.message });
    }
}

export async function getGpax(req, res) {
    try {
        
        const query = `
                SELECT S.student_id,
                    JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'grade', SR.grade,
                            'credit', C.credit        
                        )
                    ) AS register
                    FROM Course C INNER JOIN stu_register SR ON C.course_id = SR.course_id 
                    INNER JOIN Student S ON S.student_id = SR.student_id WHERE S.student_id = ?
                    GROUP BY S.student_id
            `;
        const [student] = await pool.execute(query, [req.body.student_id]);
        connection.release();

        let total_credit = 0;
        let sum = 0;
        let gpax = 0;
        if (student.length > 0) {
            const { register } = student[0];
            for (let i = 0; i < register.length; i++) {
                sum += (register[i].credit * register[i].grade);
                total_credit += register[i].credit;
            }
            gpax = sum / total_credit;

            return res.status(200).send({ gpax: gpax });
        }
        else return res.status(200).send({ gpax: gpax });
        
    } catch (error) {
        connection.release();
        return res.status(404).send({ error: error.message });
    }

}

export async function getTotalCredit(req, res) {
    try { 
        const query = `
                SELECT SUM(ET.credit_term) AS total_credit
                FROM Student S INNER JOIN edu_term ET ON S.student_id = ET.student_id
                WHERE S.student_id = ? GROUP BY S.student_id
            `;
        const [credit] = await pool.execute(query, [req.body.student_id]);
        connection.release();
        if (credit.length > 0) {
            res.json(credit[0]);
        }
        else res.json({ total_credit: 0 });
        
    } catch (error) {
        connection.release();
        return res.status(404).send({ error: error.message });
    }
}

export async function getScholar(req, res) {
    const date = new Date();

    try { // low_grade
        const token = req.headers.authorization.split(" ")[1];
        const query = `
            SELECT scholarship_id, scholarship_name, finite FROM Scholarship WHERE start <= ? AND end >= ? AND count < finite
            AND scholarship_id NOT IN (SELECT scholarship_id FROM scholar_history WHERE student_id = ?)   
        `;
        const [scholarRows] = await pool.execute(query, [date, date, token]);
        connection.release();
        res.json(scholarRows);
    } catch (error) {
        connection.release();
        return res.status(500).send({ error: error.message });
    }
}

export async function getStatusScholar(req, res) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const { enYear, year } = req.body;
        const pre_year = enYear + (year - 1);

        const query = `
            SELECT scholarship_name, status, approve 
            FROM scholar_history SH INNER JOIN Scholarship S ON SH.scholarship_id = S.scholarship_id
            WHERE student_id = ? AND get_year = ?
        `;
        const [scholarRows] = await pool.execute(query, [token, pre_year]);
        connection.release();
        res.json(scholarRows);
    } catch (error) {
        connection.release();
        return res.status(500).send({ error: error.message });
    }
}

// transaction
// update tb student, insert row scholar_history
export async function registerScholar(req, res) {
    try {
        const pre_year = new Date().getFullYear() + 543;
        const token = req.headers.authorization.split(" ")[1];
        const query = `
            UPDATE Student SET email = ?, phone = ?, salary = ?, city = ?, state = ?, zip_code = ?, address = ?
            WHERE student_id = ?   
        `;
        const { info, apply } = req.body;
        await connection.beginTransaction();
        await connection.execute(query,
            [info.email, info.phone, info.salary, info.city, info.state, info.zip_code, info.address, token]
        );
        await connection.execute(
            'INSERT INTO scholar_history (student_id, scholarship_id, get_year) VALUES (?, ?, ?)',
            [apply.student_id, apply.scholarship_id, pre_year]
        );

        await connection.commit();
        connection.release();
        return res.status(200).send({ msg: 'Register scholarship and Update successfully' });

    } catch (error) {
        await connection.rollback();
        connection.release();
        return res.status(404).send({ error: error.message });
    }

}


// edit year -> course_detail
export async function getAvailableCourse(req, res) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const { department_id, year, type } = req.body;
        const month = new Date().getMonth();
        let term = 2;
        if (month >= 7) term = 1; // after august term 1
        let pre_year = (new Date().getFullYear() + 543);

        const query = `
            SELECT C.*, 
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'course_id', course_detail.course_id,
                    'gr', course_detail.gr,
                    'teacher_id', course_detail.teacher_id,
                    'start_time', course_detail.start_time,
                    'finish_time', course_detail.finish_time,
                    'day', course_detail.day,
                    'class_id', course_detail.class_id,
                    'finite', course_detail.finite
                )
            ) AS Coursedetails
            FROM Course C INNER JOIN course_detail ON course_detail.course_id = C.course_id
            WHERE C.type = ? AND course_detail.count < course_detail.finite AND course_detail.year = ?
            AND C.course_id IN (
                SELECT course_id FROM available_course WHERE department_id = ? AND year = ? 
                AND term = ? AND course_id NOT IN
                (SELECT course_id FROM stu_register WHERE student_id = ? AND year = ? AND term = ?)
            )
            GROUP BY C.course_id, C.department_id, C.credit, C.type, C.description, C.course_name
              
        `;

        if (token) {
            const [resDetail] = await pool.execute(query,
                [type, pre_year, department_id, year, term, token, year, term]
            );
            connection.release();
            res.json(resDetail);
        }
        connection.release();
    } catch (error) {
        connection.release();
        return res.status(404).send({ error: error.message });
    }
}

export async function getCourseDe(req, res) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const { department_id, year, type } = req.body;
        const month = new Date().getMonth();
        let term = 1;
        if (month >= 7) term = 1; // after august term 1

        const query = `
            SELECT C.*
            FROM available_course AC INNER JOIN Course C ON C.course_id = AC.course_id
            WHERE AC.department_id = ? AND AC.year = ? AND AC.term = ?
              
        `;
        const [resDetail] = await pool.execute(query,
            [department_id, year, term]
        );
        connection.release();
        res.json(resDetail);

    } catch (error) {
        connection.release();
        return res.status(404).send({ error: error.message });
    }
}

// more detail of course
export async function getSelCourse(req, res) {
    try {
        const { id } = req.body;

        const query = `
            SELECT Course.*
            FROM Course WHERE course_id = ?        
        `;
        const [resDetail] = await pool.execute(query,
            [id]
        );
        connection.release();
        res.json(resDetail[0]);

    } catch (error) {
        connection.release();
        return res.status(404).send({ error: error.message });
    }
}


// transaction 
// insert tb stu_register, modify tb course_detail increase count, modify tb edu_term increse credit_term
export async function registerCourse(req, res) {
    try {
        let totalCredit = 0;
        let pre_year = (new Date().getFullYear() + 543);
        const token = req.headers.authorization.split(" ")[1];
        const { regis } = req.body;

        const deValues = await regis.map(detail => {
            return [
                detail.course_id, detail.gr, detail.student_id, detail.year, detail.term,
            ];
        });
        const queryRegis = `
            INSERT INTO stu_register (course_id, gr, student_id, year, term)
            VALUES ${deValues.map(() => '(?, ?, ?, ?, ?)').join(',')}
        `

        await connection.beginTransaction();
        await connection.execute(queryRegis, deValues.flat());

        for (let i = 0; i < regis.length; i++) {
            await connection.execute(
                'UPDATE course_detail SET count = count + 1 WHERE course_id = ? AND gr = ? AND year = ?',
                [regis[i].course_id, regis[i].gr, pre_year]
            );
            totalCredit = totalCredit + regis[i].credit;
        }

        const [edu] = await connection.execute(
            'SELECT * FROM edu_term WHERE student_id = ? AND year = ? AND term = ?',
            [token, regis[0].year, regis[0].term]
        );

        if (edu.length > 0) {
            await connection.execute(
                'UPDATE edu_term SET credit_term = credit_term + ? WHERE student_id = ? AND year = ? AND term = ?',
                [totalCredit, token, regis[0].year, regis[0].term]
            );
        } else {
            await connection.execute(
                'INSERT INTO edu_term (student_id, year, term, credit_term) VALUES (?, ?, ?, ?)',
                [token, regis[0].year, regis[0].term, totalCredit]
            );
        }

        await connection.commit();
        connection.release();
        return res.status(200).send({ msg: 'Register Course successfully' });

    } catch (error) {
        await connection.rollback();
        connection.release();
        return res.status(404).send({ error: error.message });
    }
}

export async function getActivity(req, res) {
    const date = new Date();
    try {
        const query = `
            SELECT activity_id FROM Activity WHERE date_ac > ? AND count < finite
            AND activity_id NOT IN (SELECT activity_id FROM arr_activity WHERE student_id = ?)   
        `;
        const token = req.headers.authorization.split(" ")[1];
        const [available] = await pool.execute(query, [date, token]);
        connection.release();
        res.json(available);

    } catch (error) {
        connection.release();
        return res.status(404).send({ error: error.message });
    }
}

// transaction
// modify tb arr_activity insert new row, tb Activity increase count
export async function registerActivity(req, res) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const { arr_activity } = req.body;

        await connection.beginTransaction();
        await connection.execute('INSERT INTO arr_activity (student_id, activity_id) VALUES (?, ?)',
            [token, arr_activity.activity_id]
        );

        const query = `
            UPDATE Activity SET count = count + 1 WHERE activity_id = ?
        `
        await connection.execute(query, [arr_activity.activity_id]);

        await connection.commit();
        connection.release();
        return res.status(200).send({ msg: 'Register Activity successfully' });

    } catch (error) {
        await connection.rollback();
        connection.release();
        return res.status(404).send({ error: error.message });
    }
}


export async function getArrActivity(req, res) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const { evaluate } = req.body; // boolean
        if (evaluate) { // both evaluate and not evaluate -> page StudentAtten
            const query = `
                SELECT * FROM arr_activity AR INNER JOIN Activity A ON A.activity_id = AR.activity_id
                WHERE student_id = ?
            `
            const [arr] = await connection.execute(query, [token]);
            connection.release();
            res.json(arr);

        } else { // not evaluate -> page StudentEvaActivity (can evalate after finished activity and have time to evaluate 10 days)

            const query = `
                SELECT * FROM arr_activity AR INNER JOIN Activity A ON A.activity_id = AR.activity_id 
                WHERE student_id = ? AND status = ? AND ? > date_ac + ac_day AND ? - date_ac + ac_day < 10
            `
            const [arr] = await connection.execute(query, [token, evaluate, new Date(), new Date()]);
            connection.release();
            res.json(arr);

        }
        connection.release();
    } catch (error) {
        connection.release();
        return res.status(404).send({ error: error.message });
    }
}


// transaction 
// modify Student (increase hours), modify arr_activity (change status)
export async function evaActivity(req, res) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const { evaluate } = req.body; // activity_id, hours

        const query = `
            UPDATE arr_activity SET status = ? WHERE student_id = ? AND activity_id = ?
        `
        const queryHr = `
            UPDATE Student SET hours = hours + ? WHERE student_id = ?
        `
        await connection.beginTransaction();
        await connection.execute(query, [true, token, evaluate.activity_id]);
        await connection.execute(queryHr, [evaluate.hours, token]);

        await connection.commit();
        connection.release();
        return res.status(200).send({ msg: 'Register Activity successfully' });

    } catch (error) {
        await connection.rollback();
        connection.release();
        return res.status(404).send({ error: error.message });
    }
}

// edit year -> course_detail
export async function getStuRegister(req, res) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        let pre_year = (new Date().getFullYear() + 543);
        
        const { year, term } = req.body;
        const query = `
                SELECT C.*, CD.*
                FROM Course C 
                INNER JOIN stu_register S ON S.course_id = C.course_id
                INNER JOIN course_detail CD ON CD.course_id = S.course_id AND CD.gr = S.gr
                WHERE S.year = ? AND S.term = ? AND S.student_id = ? AND CD.year = ?
            `;

        const [register] = await connection.execute(query, [year, term, token, pre_year]);
        connection.release();
        res.json(register);

    } catch (error) {
        connection.release();
        return res.status(404).send({ error: error.message });
    }

}

// send token year from request
// fetch and is used in student change group component
export async function getStuRegisterChange(req, res) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        let pre_year = (new Date().getFullYear() + 543);

        const { year } = req.body;
        const month = new Date().getMonth();
        let term = 2;
        if (month >= 7) term = 1; // after august term 1
        const query = `
            SELECT C.*, S.gr, 
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'gr', D.gr,
                    'teacher_id', D.teacher_id,
                    'start_time', D.start_time,
                    'finish_time', D.finish_time,
                    'day', D.day,
                    'class_id', D.class_id,
                    'finite', D.finite
                )
            ) AS Coursedetails
            FROM Course C 
            JOIN stu_register S ON S.course_id = C.course_id
            JOIN course_detail D ON D.course_id = S.course_id
            WHERE S.year = ? AND S.term = ? AND S.student_id = ? AND D.count < D.finite AND D.year = ?
            GROUP BY C.course_id, C.department_id, C.credit, C.type, C.description, C.course_name      
        `;

        const [register] = await connection.execute(query, [year, term, token, pre_year]);
        connection.release();
        res.json(register);

    } catch (error) {
        connection.release();
        return res.status(404).send({ error: error.message });
    }
}

// fetch and is used in student delete group compoent
export async function getStuRegisterDelete(req, res) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        let pre_year = (new Date().getFullYear() + 543);

        const { year } = req.body;
        const month = new Date().getMonth();
        let term = 2;
        if (month >= 7) term = 1; // after august term 1
        const query = `
            SELECT C.*, D.gr, D.teacher_id, D.class_id 
            FROM Course C 
            JOIN stu_register S ON S.course_id = C.course_id
            JOIN course_detail D ON D.course_id = S.course_id AND D.gr = S.gr
            WHERE S.year = ? AND S.term = ? AND S.student_id = ? AND D.year = ? 
        `;

        const [register] = await connection.execute(query, [year, term, token, pre_year]);
        connection.release();
        res.json(register);

    } catch (error) {
        connection.release();
        return res.status(404).send({ error: error.message });
    }
}


// can update group more than one course
// transaction
// modify Studentregister (group), Coursedetail (count)
export async function changeGroup(req, res) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        let pre_year = (new Date().getFullYear() + 543);
        
        const { update, year, term } = await req.body;

        await connection.beginTransaction();

        for (let i = 0; i < update.length; i++) {
            if (update[i].old_gr != update[i].gr) {
                await connection.execute( // old group before change
                    'UPDATE course_detail SET count = count - 1 WHERE course_id = ? AND gr = ? AND year = ?', // add filter present year of course_detail
                    [update[i].course_id, update[i].old_gr, pre_year]
                );
                await connection.execute( // new group after change
                    'UPDATE stu_register SET gr = ? WHERE student_id = ? AND year = ? AND term = ? AND course_id = ?',
                    [update[i].gr, token, year, term, update[i].course_id]
                );
                await connection.execute( // new group after change
                    'UPDATE course_detail SET count = count + 1 WHERE course_id = ? AND gr = ? AND year = ?',
                    [update[i].course_id, update[i].gr, pre_year]
                );
            }

        }
        await connection.commit();
        connection.release();
        return res.status(200).send({ msg: 'Change Group Successfully' });

    } catch (error) {
        await connection.rollback();
        connection.release();
        return res.status(404).send({ error: error.message });
    }
}


// transaction
// delete course just once per times
// delete Studentregister, modify Coursedetail (count), modify edu_term (credit)
export async function delCourse(req, res) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        let pre_year = (new Date().getFullYear() + 543);

        const { course_id, gr, year, term, credit } = await req.body;

        await connection.beginTransaction();

        // decrese count of group in this course
        await connection.execute(
            'UPDATE course_detail SET count = count - 1 WHERE course_id = ? AND gr = ? AND year = ?', // add filter present year of course_detail
            [course_id, gr, pre_year]
        );

        // send credit of course with request, decrease credit of this student in this term
        await connection.execute(
            'UPDATE edu_term SET credit_term = credit_term - ? WHERE student_id = ? AND year = ? AND term = ?',
            [credit, token, year, term]
        );

        // delete row in tb stu_register of this course
        await connection.execute(
            'DELETE FROM stu_register WHERE student_id = ? AND course_id = ? AND year = ? AND term = ?',
            [token, course_id, year, term]
        );

        await connection.commit();
        connection.release();
        return res.status(200).send({ msg: 'Delete Course Successfully' });

    } catch (error) {
        await connection.rollback();
        connection.release();
        return res.status(404).send({ error: error.message });
    }
}


// advanced analysis

// (Student) -> each activity
// 2. The number of people in each faculty apply in an activity (6 activity) 
// real time present year
export async function getFacActivity(req, res) {
    try {
        const { activity_id } = await req.body;

        const query = `
            SELECT count(S.student_id) AS num_student, F.faculty_name
            FROM Activity A INNER JOIN arr_activity AR ON A.activity_id = AR.activity_id
            INNER JOIN Student S ON S.student_id = AR.student_id
            INNER JOIN Department D ON S.department_id = D.department_id
            INNER JOIN Faculty F ON F.faculty_id = D.faculty_id
            WHERE A.activity_id = ?
            GROUP BY F.faculty_id
        `;

        const [num_student] = await connection.execute(query, [activity_id]);
        connection.release();
        res.json(num_student);

    } catch (error) {
        connection.release();
        return res.status(404).send({ error: error.message });
    }
}


export async function getAvgScholar(req, res) {
    try {
            const pre_year = new Date().getFullYear() + 543;
            const query = `
                SELECT S.scholarship_name, avg(stu_gpax) AS avg_gpax, avg(SD.hours) AS avg_hours FROM
                (SELECT S.student_id, avg(ET.grade_term) AS stu_gpax FROM Student S 
                INNER JOIN edu_term ET ON S.student_id = ET.student_id
                WHERE ET.status = ? GROUP BY S.student_id) AS tb_gpax
                INNER JOIN Student SD ON SD.student_id = tb_gpax.student_id
                INNER JOIN scholar_history SH ON SD.student_id = SH.student_id
                INNER JOIN Scholarship S ON S.scholarship_id = SH.scholarship_id
                WHERE SH.get_year != ? AND SH.approve = ?
                GROUP BY S.scholarship_name
            `;

        const [num_student] = await connection.execute(query, [true, pre_year, true]);
        connection.release();
        res.json(num_student);

    } catch (error) {
        connection.release();
        return res.status(404).send({ error: error.message });
    }
}