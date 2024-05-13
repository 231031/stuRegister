import bcrypt from 'bcrypt';
import pool from '../dbcon.js';
const connection = await pool.getConnection();

export async function loginTeacher(req, res) {
    try {
        let change = true;
        const { username, password } = req.body;
        const [teacher] = await connection.execute('SELECT * FROM Teacher WHERE teacher_id = ?', [username]);
        connection.release();
        const user = teacher[0];

        if (user !== null) {
            if (password === user.password && 7 === user.password.length) {
                change = false;
                return res.status(200).send({
                    msg : "Please change password and Fill personal information",
                    username : user.teacher_id,
                    setPass : change,
                })
            } 
            bcrypt.compare(password, user.password)
            .then(match => {
                if (!match) return res.status(400).send({ error : "invalid password!"});
                return res.status(200).send({
                    msg : "Login successful",
                    username : user.teacher_id,
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

export async function getInfo(req, res) {
    try {
        const [user] = await connection.execute(
            'SELECT teacher_id, first_name, last_name, position, department_id FROM Teacher WHERE teacher_id = ?', 
            [req.body.teacher_id]
        );
        connection.release();
        res.json(user[0]);
    } catch (error) {
        connection.release();
        return res.status(404).send({ error: error.message });
    }
}

export async function updatePassword(req, res) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const query = `
            UPDATE Teacher SET password = ? WHERE teacher_id = ?
        `
        if (token) {
            const hashPass = await bcrypt.hash(req.body.password, 10);
            await connection.execute(query, [hashPass, token]);
            connection.release();
            return res.status(200).send({ msg : 'teacher updated successfully'});
        }
        connection.release();
    } catch (error) {
        connection.release();
        return res.status(404).send({ error: error.message });
    }
}

export async function updateTeacher(req, res) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const query = `
            UPDATE Teacher SET password = ? WHERE teacher_id = ?
        `
        if (token) {
            await connection.execute(query, []);
            connection.release();
            return res.status(200).send({ msg : 'teacher updated successfully'});
        }
        connection.release();
    } catch (error) {
        connection.release();
        return res.status(404).send({ error: error.message });
    }
}

export async function getCourseTeacher(req, res) {
    try {
        const query = `
            SELECT C.* FROM course_detail CD INNER JOIN Course C ON CD.course_id = C.course_id 
            WHERE teacher_id = ? GROUP BY C.course_id
        `;
        const [courses] = await pool.execute(query, [req.body.teacher_id]);
        connection.release();
        res.json(courses);
        
    } catch (error) {
        connection.release();
        return res.status(404).send({ error: error.message });
    }
}

export async function getCourse(req, res) {
    try {
        const [course] = await connection.execute(
            'SELECT * FROM Course WHERE course_id = ?', 
            [req.body.course_id]
        );
        connection.release();
        res.json(course[0]);
        
    } catch (error) {
        connection.release();
        return res.status(404).send({ error: error.message });
    }
}

export async function editCourse(req, res) {
    try {
        const { course_name, description } = await req.body.info;
        await connection.execute(
            'UPDATE Course SET course_name = ?, description = ? WHERE course_id = ?', 
            [course_name, description, req.body.course_id]
        );
        connection.release();
        return res.status(200).send({ msg : 'Course updated successfully'});
        
    } catch (error) {
        connection.release();
        return res.status(404).send({ error: error.message });
    }
}

export async function getStuTeacher(req, res) {
    try {
        const query = `
            SELECT S.student_id, S.first_name, S.last_name, S.year, C.course_id, C.course_name, C.credit 
            FROM stu_register SR INNER JOIN Student S ON SR.student_id = S.student_id 
            INNER JOIN course_detail CD ON CD.course_id = SR.course_id AND CD.gr = SR.gr
            INNER JOIN Course C ON C.course_id = SR.course_id
            WHERE CD.teacher_id = ? AND CD.course_id = ? AND SR.status_grade = ?
        `;
        const [courses] = await pool.execute(query, [req.body.teacher_id, req.body.course_id, false]);
        connection.release();
        res.json(courses);
        
    } catch (error) {
        connection.release();
        return res.status(404).send({ error: error.message });
    }
}

// transaction modify stu_register (update grade), modify edu_term (update grade_term)
export async function updateGrade(req, res) {
    try {
        const { term } = req.body;
        const queryRegis = `
            UPDATE stu_register SET grade = ?, status_grade = ? WHERE student_id = ? AND course_id = ? AND year = ?
        `
        const query = `
            SELECT * FROM edu_term WHERE student_id = ? AND year = ? AND term = ?
        `
        const queryEdu = `
            UPDATE edu_term SET grade_term = ? WHERE student_id = ? AND year = ? AND term = ?
        `
        await connection.beginTransaction();
        for (const student of req.body.list) {
            const { student_id, grade, course_id, year, credit } = await student;
            let sum = grade*credit;

            // update grade in tb stu_register
            await connection.execute(queryRegis, [grade, true, student_id, course_id, year]);

            // query grade_term before update with new grade
            const [detail] = await connection.execute(query, [student_id, year, term]);
            const result = await detail[0];

            // calculate new gpa and update grade_term with gpa
            const oldSum = (result.credit_term)*(result.grade_term); // sum of each grade*credit
            sum = sum + oldSum;
            let gpa = sum/result.credit_term;
            await connection.execute(queryEdu, [gpa, student_id, year, term]);

        }
        await connection.commit();
        connection.release();
        return res.status(200).send({ msg : 'Update Grade Successfully'});
    } catch (error) {
        await connection.rollback();
        connection.release();
        return res.status(404).send({ error: error.message });
    }
}