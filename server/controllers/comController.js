import pool from '../dbcon.js';
const connection = await pool.getConnection();


export async function login(req, res) {
    try {
        // committeekeykmutt3123
        const key = 'committeekeykmutt3123';
        if (req.body.key === key) {
            return res.status(200).send({
                msg : "Login successful",
                role : 'committee',
            }) 
        }
        else return res.status(401).send({ error : "invalid key!"});

    } catch (error) {
        return res.status(404).send({ error: error.message });
    }
}

// get just present year
export async function getApplicant(req, res) {
    try {
        const pre_year = new Date().getFullYear() + 543;
        const query = `
            SELECT SH.*, SD.first_name, SD.last_name, D.department_name, F.faculty_name
            FROM Scholarship S INNER JOIN scholar_history SH ON S.scholarship_id = SH.scholarship_id
            INNER JOIN Student SD ON SD.student_id = SH.student_id 
            INNER JOIN Department D ON SD.department_id = D.department_id
            INNER JOIN Faculty F ON F.faculty_id = D.faculty_id
            WHERE SH.scholarship_id = ? ORDER BY SH.get_year AND SD.student_id DESC 
        `;
        const [student] = await pool.execute(query, [req.body.id]);
        connection.release();
        res.json(student);

    } catch (error) {
        connection.release();
        return res.status(404).send({ error: error.message });
    }
}

export async function getScholarHis(req, res) {
    try {
        const query = `
            SELECT SH.*, SD.first_name, SD.last_name, D.department_name, F.faculty_name
            FROM Scholarship S INNER JOIN scholar_history SH ON S.scholarship_id = SH.scholarship_id
            INNER JOIN Student SD ON SD.student_id = SH.student_id 
            INNER JOIN Department D ON D.department_id = SD.department_id
            INNER JOIN Faculty F ON F.faculty_id = D.faculty_id
            WHERE S.scholarship_id = ? AND SH.status = ?
        `;
        const [student] = await pool.execute(query, [req.body.id, false]);
        connection.release();
        res.json(student);

    } catch (error) {
        connection.release();
        return res.status(404).send({ error: error.message });
    }
}

// transaction modify Scholarship (increase count), modify schlar_history (change status and approve)
export async function updateCheck(req, res) {
    try {
        const { evaluate, id } = await req.body;
        await connection.beginTransaction();

        for (const stu of evaluate) {
            if (stu.approve) {
                await connection.execute(
                    'UPDATE Scholarship SET count = count + 1 WHERE scholarship_id = ?', 
                    [id]
                );
    
                await connection.execute(
                    'UPDATE scholar_history SET status = ?, approve = ? WHERE scholarship_id = ? AND student_id = ? AND get_year = ?', 
                    [true, true, id, stu.student_id, stu.get_year]
                );
            } else {
                await connection.execute(
                    'UPDATE scholar_history SET status = ? HERE scholarship_id = ? AND student_id = ? AND get_year = ?', 
                    [true, id, stu.student_id, stu.get_year]
                );
            }
        }
        await connection.commit();
        connection.release();
        return res.status(200).send({ msg : 'Update successfully'});

    } catch (error) {
        await connection.rollback();
        connection.release();
        return res.status(404).send({ error: error.message });
    }
}

// continue calculate gpax (sum of (grade*credit)  / total credit)
// tb stu_register, tb Student
export async function getStudent(req, res) {
    try {
        const query = `
            SELECT S.student_id, S.first_name, S.last_name, S.salary, S.f_salary, 
            S.m_salary, S.address, S.zip_code, S.city, S.state, D.department_name, F.faculty_name,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'grade', SR.grade,
                        'credit', C.credit        
                    )
                ) AS register
                FROM Course C INNER JOIN stu_register SR ON C.course_id = SR.course_id 
                INNER JOIN Student S ON S.student_id = SR.student_id 
                INNER JOIN Department D ON D.department_id = S.department_id
                INNER JOIN Faculty F ON F.faculty_id = D.faculty_id
                WHERE S.student_id = ?
                GROUP BY S.student_id, S.first_name, S.last_name, S.salary, S.f_salary, 
                S.m_salary, S.address, S.zip_code, S.city, S.state, D.department_name, F.faculty_name
        `;
        const [student] = await pool.execute(query, [req.body.id]);
        connection.release();

        let total_credit = 0;
        let sum = 0;
        const { register } = student[0];
        for (let i = 0; i < register.length; i++) {
            sum += (register[i].credit*register[i].grade);
            total_credit += register[i].credit;
        }
        let gpax = sum / total_credit;

        return res.status(200).send({ gpax : gpax, info : student[0] });
    } catch (error) {
        connection.release();
        return res.status(404).send({ error: error.message });
    }
}


// advanced analysis

// 1
// get the number of students in each faculty who get shcolarship
// the scholarships can apply every year in range of time and reset count every year
// get_year is year that the student gets shcolarship
export async function getCountFaculty(req, res) {
    try {
        const pre_year = new Date().getFullYear() + 543;
        const query = `
            SELECT F.faculty_name, count(SD.student_id) AS count_student
            FROM Scholarship S INNER JOIN scholar_history SH ON S.scholarship_id = SH.scholarship_id
            INNER JOIN Student SD ON SD.student_id = SH.student_id 
            INNER JOIN Department D ON D.department_id = SD.department_id
            INNER JOIN Faculty F ON F.faculty_id = D.faculty_id
            WHERE S.scholarship_id = ? AND SH.approve = ? AND SH.get_year = ?
            GROUP BY F.faculty_name
        `;
        const [student] = await pool.execute(query, [req.body.id, true, pre_year]);
        connection.release();
        res.json(student);

    } catch (error) {
        connection.release();
        return res.status(404).send({ error: error.message });
    }
}

// average salary of father's student in each faculty
export async function getAvgF(req, res) {
    try {
        const query = `
            SELECT F.faculty_name, avg(S.f_salary) AS avg_salary
            From Student S
            INNER JOIN Department D ON D.department_id = S.department_id
            INNER JOIN Faculty F ON F.faculty_id = D.faculty_id
            GROUP BY F.faculty_name
        `;
        const [avg_salary_f] = await pool.execute(query);
        connection.release();
        res.json(avg_salary_f);

    } catch (error) {
        connection.release();
        return res.status(404).send({ error: error.message });
    }
}

// average salary of mother's student in each faculty
export async function getAvgM(req, res) {
    try {
        const query = `
            SELECT F.faculty_name, avg(S.m_salary) AS avg_salary
            From Student S
            INNER JOIN Department D ON D.department_id = S.department_id
            INNER JOIN Faculty F ON F.faculty_id = D.faculty_id
            GROUP BY F.faculty_name
        `;
        const [avg_salary_m] = await pool.execute(query);
        connection.release();
        res.json(avg_salary_m);

    } catch (error) {
        connection.release();
        return res.status(404).send({ error: error.message });
    }
}