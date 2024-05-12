import pool from '../dbcon.js';
const connection = await pool.getConnection();

export async function getApplicant(req, res) {
    try {
        const query = `
            SELECT SH.*, SD.first_name, SD.last_name
            FROM Scholarship S INNER JOIN scholar_history SH ON S.scholarship_id = SH.scholarship_id
            INNER JOIN Student SD ON SD.student_id = SH.student_id WHERE SH.scholarship_id = ?
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
            SELECT SH.*, SD.first_name, SD.last_name
            FROM Scholarship S INNER JOIN scholar_history SH ON S.scholarship_id = SH.scholarship_id
            INNER JOIN Student SD ON SD.student_id = SH.student_id WHERE SH.status = ?
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
// not tested yet
export async function getStudent(req, res) {
    try {
        const query = `
            SELECT S.student_id, S.first_name, S.last_name, 
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'grade', SR.grade,
                        'credit', C.credit,          
                    )
                ) AS Register
                FROM Course C INNER JOIN stu_register ON C.course_id = SR.course_id 
                INNER JOIN Student S ON S.student_id = SR.student_id WHERE S.student_id = ?
                GROUP BY S.student_id, S.first_name, S.last_name
        `;
        const [student] = await pool.execute(query, [req.body.id]);
        connection.release();
        
        let total_credit = 0;
        let sum = 0;
        const { register } = student;
        for (const course of register) {
            sum += (course.credit*course.grade);
            total_credit += course.credit;
        }
        let gpax = sum / total_credit;

        return res.status(200).send({ gpax : gpax, info : student });
    } catch (error) {
        connection.release();
        return res.status(404).send({ error: error.message });
    }
}

