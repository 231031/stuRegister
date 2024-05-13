import bcrypt from 'bcrypt';

import pool from '../dbcon.js';
const connection = await pool.getConnection();

export async function loginStudent(req, res) {
    try {
        let change = true;
        const { username, password } = req.body;
        const [stu, fields] = await connection.execute('SELECT * FROM Student WHERE student_id = ?', [username]);
        connection.release();
        const user = stu[0];
        if (user !== null) {
            if (password === user.password && 7 === user.password.length) {
                change = false;
                return res.status(200).send({
                    msg : "Please change password and Fill personal information",
                    student_id : user.student_id,
                    department_id : user.department_id,
                    year: user.year,
                    setPass : change,
                })
            } 
            bcrypt.compare(password, user.password)
            .then(match => {
                if (!match) return res.status(400).send({ error : "invalid password!"});
                return res.status(200).send({
                    msg : "Login successful",
                    student_id : user.student_id,
                    department_id : user.department_id,
                    year: user.year,
                    setPass : change,
                })
            }) 
        } 
        else res.json(user);
        
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
            return res.status(200).send({ msg : 'Student updated successfully'});
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
        return res.status(200).send({ msg : 'Student updated successfully'});   
         
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
                            'course_id', course_id,
                            'grade', grade
                        )
                    ) AS course_term
                FROM 
                    stu_register
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

export async function getScholar(req, res) {
    const date = new Date();

    try { // low_grade
        const token = req.headers.authorization.split(" ")[1];
        const query = `
            SELECT scholarship_id, scholarship_name FROM Scholarship WHERE start <= ? AND end >= ? AND count < finite
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


// update student, register scholarship
export async function registerScholar(req, res) {
    try {
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
            [apply.student_id, apply.scholarship_id, apply.get_year]
        );

        await connection.commit();
        connection.release();
        return res.status(200).send({ msg : 'Register scholarship and Update successfully'});

    } catch (error) {
        await connection.rollback();
        connection.release();
        return res.status(404).send({ error: error.message });
    }
    
}

export async function getAvailableCourse(req, res) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const { department_id, year, type } = req.body;
        const month = new Date().getMonth();
        let term = 2;
        if (month >= 7) term = 1; // after august term 1

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
            WHERE C.type = ? AND course_detail.count < course_detail.finite 
            AND C.course_id IN (
                SELECT course_id FROM available_course WHERE department_id = ? AND year = ? 
                AND term = ? AND course_id NOT IN
                (SELECT course_id FROM stu_register WHERE student_id = ? AND year = ? AND term = ?)
            )
            GROUP BY C.course_id, C.department_id, C.credit, C.type, C.description, C.course_name
              
        `;

        if (token) {
            const [resDetail] = await pool.execute(query, 
                [type, department_id, year, term, token, year, term]
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

export async function registerCourse(req, res) {
    try {
        let totalCredit = 0;
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
                'UPDATE course_detail SET count = count + 1 WHERE course_id = ? AND gr = ?', 
                [regis[i].course_id, regis[i].gr]
            );
            totalCredit = totalCredit + regis[i].credit;  
        }
        
        const [edu] = await connection.execute(
            'SELECT * FROM edu_term WHERE student_id = ? AND year = ? AND term = ?', 
            [token, regis[0].year, regis[0].term]
        );

        if (edu[0]) {
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
        return res.status(200).send({ msg : 'Register Course successfully'});

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
        return res.status(200).send({ msg : 'Register Activity successfully'});

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

        } else { // not evaluate -> page StudentEvaActivity

            const query = `
                SELECT * FROM arr_activity AR INNER JOIN Activity A ON A.activity_id = AR.activity_id 
                WHERE student_id = ? AND status = ?
            `
            const [arr] = await connection.execute(query, [token, evaluate]);
            connection.release();
            res.json(arr);

        }
        connection.release();
    } catch (error) {
        connection.release();
        return res.status(404).send({ error: error.message });
    }
}

// transaction modify Student (increase hours), modify arr_activity (change status)
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
        return res.status(200).send({ msg : 'Register Activity successfully'});

    } catch (error) {
        await connection.rollback();
        connection.release();
        return res.status(404).send({ error: error.message });
    }
}

export async function getStuRegister(req, res) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const { year, term } = req.body;
        const query = `
                SELECT C.*, CD.*
                FROM Course C 
                INNER JOIN stu_register S ON S.course_id = C.course_id
                INNER JOIN course_detail CD ON CD.course_id = S.course_id AND CD.gr = S.gr
                WHERE S.year = ? AND S.term = ? AND S.student_id = ?    
            `;
    
        const [register] = await connection.execute(query, [year, term, token]);
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
            WHERE S.year = ? AND S.term = ? AND S.student_id = ? 
            GROUP BY C.course_id, C.department_id, C.credit, C.type, C.description, C.course_name      
        `;

        const [register] = await connection.execute(query, [year, term, token]);
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
        const { year } = req.body;
        const month = new Date().getMonth();
        let term = 2;
        if (month >= 7) term = 1; // after august term 1
        const query = `
            SELECT C.*, D.gr, D.teacher_id, D.class_id 
            FROM Course C 
            JOIN stu_register S ON S.course_id = C.course_id
            JOIN course_detail D ON D.course_id = S.course_id AND D.gr = S.gr
            WHERE S.year = ? AND S.term = ? AND S.student_id = ?     
        `;

        const [register] = await connection.execute(query, [year, term, token]);
        connection.release();
        res.json(register);

    } catch (error) {
        connection.release();
        return res.status(404).send({ error: error.message });
    }
}

// not tested yet
// can update group more than one course
// transaction
// modify Studentregister (group), Coursedetail (count)
export async function changeGroup(req, res) {
    try {
        const token = req.headers.authorization.split(" ")[1];

        await connection.beginTransaction();
        await connection.execute( // old group before change
            'UPDATE course_detail SET count = count - 1 WHERE course_id = ? AND gr = ? ',
            []
        );
        await connection.execute( // new group after change
            'UPDATE stu_register SET gr = ? WHERE student_id = ? AND year = ? AND term = ? AND course_id = ?', 
            []
        );
        await connection.execute( // new group after change
            'UPDATE course_detail SET count = count + 1 WHERE course_id = ? AND gr = ?', 
            []
        );


        await connection.commit();
        connection.release();
        return res.status(200).send({ msg : 'Change Group Successfully'});
    } catch (error) {
        await connection.rollback();
        connection.release();
        return res.status(404).send({ error: error.message });
    }
}


// delete course just once per times
// delete Studentregister, modify Coursedetail (count), modify edu_term (credit)
export async function delCourse(req, res) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const { course_id, gr, year, term, credit } = await req.body;

        await connection.beginTransaction();

        // decrese count of group in this course
        await connection.execute(
            'UPDATE course_detail SET count = count - 1 WHERE course_id = ? AND gr = ? ',
            [course_id, gr]
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
        return res.status(200).send({ msg : 'Delete Course Successfully'});
        
    } catch (error) {
        await connection.rollback();
        connection.release();
        return res.status(404).send({ error: error.message });
    }
}