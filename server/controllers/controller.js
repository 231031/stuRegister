import pool from '../dbcon.js';

const connection = await pool.getConnection();

export async function getAllStudents(req, res) {
    try {
        const [students] = await connection.execute(
            'SELECT student_id, first_name, last_name, year FROM Student'
        );
        connection.release();
        res.json(students);
        
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

export async function getAllCourses(req, res) {
    try {
        const [courses] = await connection.execute(
            'SELECT * FROM Course'
        );
        connection.release();
        res.json(courses);
        
    } catch (error) {
        connection.release();
        return res.status(404).send({ error: error.message });
    }
}

export async function getAllScholarships(req, res) {
    try {
        const [scholars] = await connection.execute(
            'SELECT * FROM Scholarship'
        );
        connection.release();
        res.json(scholars);
        
    } catch (error) {
        connection.release();
        return res.status(404).send({ error: error.message });
    }
}

export async function getOpenActivitys(req, res) {
    try {
        const [activitys] = await connection.execute(
            'SELECT * FROM Activity WHERE date_ac > ? ORDER BY date_ac',
            [new Date()]
        );
        connection.release();
        res.json(activitys);
        
    } catch (error) {
        connection.release();
        return res.status(404).send({ error: error.message });
    }
}

export async function getAllCoursesDe(req, res) {
    try {
        const [course_de] = await connection.execute(
            'SELECT * FROM course_detail'
        );
        connection.release();
        res.json(course_de);
        
    } catch (error) {
        connection.release();
        return res.status(404).send({ error: error.message });
    }
}

export async function getAllFaculty(req, res) {
    try {
        const [faculty] = await connection.execute(
            'SELECT * FROM Faculty'
        );
        connection.release();
        res.json(faculty);
        
    } catch (error) {
        connection.release();
        return res.status(404).send({ error: error.message });
    }
}

export async function getAllDepartments(req, res) {
    try {
        const [departments] = await connection.execute(
            'SELECT * FROM Department'
        );
        connection.release();
        res.json(departments);
        
    } catch (error) {
        connection.release();
        return res.status(404).send({ error: error.message });
    }
}

export async function getAllTeachers(req, res) {
    try {
        const [teachers] = await connection.execute(
            'SELECT * FROM Teacher'
        );
        connection.release();
        res.json(teachers);
        
    } catch (error) {
        connection.release();
        return res.status(404).send({ error: error.message });
    }
}