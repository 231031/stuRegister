import pool from '../dbcon.js';
const connection = await pool.getConnection();

export async function login(req, res) {
    try {
        // adminkeykmutt23231010
        const key = 'adminkeykmutt23231010';
        if (req.body.key === key) {
            return res.status(200).send({
                msg : "Login successful",
                role : 'admin',
            }) 
        }
        else return res.status(401).send({ error : "invalid key!"});

    } catch (error) {
        return res.status(404).send({ error: error.message });
    }
}

export async function addCourse(req, res) {
    try {
        const courseValues = await req.body.course.map(course => {
            return [course.course_id, course.course_name, course.department_id, course.credit, course.type];
        });

        const query = `
            INSERT INTO Course (course_id, course_name, department_id, credit, type) 
            VALUES ${courseValues.map(() => '(?, ?, ?, ?, ?)').join(',')}
        `
        await connection.beginTransaction();
        await connection.execute(query, courseValues.flat());
        await connection.commit();
        connection.release();

        return res.status(200).send({ msg : 'Add Course successfully'});
    } catch (error) {
        await connection.rollback();
        connection.release();
        return res.status(404).send({ error: error.message });
    }
}

export async function addAvailableCourse(req, res) {
    try {
        const availableValues = await req.body.available.map(available => {
            return [available.course_id, available.department_id, available.year, available.term];
        });
        const query = `
            INSERT INTO available_course (course_id, year, department_id, term)
            VALUES ${availableValues.map(() => '(?, ?, ?, ?)').join(',')}
        `
        await connection.beginTransaction();
        await connection.execute(query, availableValues.flat());
        await connection.commit();
        connection.release();
        return res.status(200).send({ msg : 'Add Available successfully'});

    } catch (error) {
        await connection.rollback();
        connection.release();
        return res.status(404).send({ error: error.message });
    }
}

export async function addFaculty(req, res) {
    try {
        const facultyValues = await req.body.faculty.map(faculty => {
            return [faculty.faculty_id, faculty.faculty_name];
        });
        const query = `
            INSERT INTO Faculty (faculty_id, faculty_name)
            VALUES ${facultyValues.map(() => '(?, ?)').join(',')}
        `
        await connection.beginTransaction();
        await connection.execute(query, facultyValues.flat());
        await connection.commit();
        connection.release();
        return res.status(200).send({ msg : 'Add Faculty successfully'});

    } catch (error) {
        await connection.rollback();
        connection.release();
        return res.status(404).send({ error: error.message });
    }
}

export async function addDepartment(req, res) {
    try {
        const departmentValues = await req.body.department.map(department => {
            return [department.department_id, department.department_name, department.faculty_id];
        });

        const query = `
        INSERT INTO Department (department_id, department_name, faculty_id)
        VALUES ${departmentValues.map(() => '(?, ?, ?)').join(',')}
        `
        await connection.beginTransaction();
        await connection.execute(query, departmentValues.flat());
        await connection.commit();
        connection.release();
        return res.status(200).send({ msg : 'Add Department successfully'});

    } catch (error) {
        await connection.rollback();
        connection.release();
        return res.status(404).send({ error: error.message });
    }
}

export async function addScholarship(req, res) {
    try {
        const scholarshipValues = await req.body.scholarship.map(scholarship => {
            return [
                scholarship.scholarship_id, scholarship.scholarship_name, scholarship.finite,
                scholarship.low_grade, scholarship.start, scholarship.end
            ];
        });
        const query = `
        INSERT INTO Scholarship (scholarship_id, scholarship_name, finite, low_grade, start, end)
        VALUES ${scholarshipValues.map(() => '(?, ?, ?, ?, ?, ?)').join(',')}
        `
        await connection.beginTransaction();
        await connection.execute(query, scholarshipValues.flat());
        await connection.commit();
        connection.release();
        return res.status(200).send({ msg : 'Add Scholarships successfully'});

    } catch (error) {
        await connection.rollback();
        connection.release();
        return res.status(404).send({ error: error.message });
    }
}

export async function addActivity(req, res) {
    try {
        const activityValues = await req.body.activity.map(activity => {
            return [
                activity.activity_id, activity.activity_name, activity.hours,
                activity.date_ac, activity.ac_day, activity.finite
            ];
        });
        const query = `
        INSERT INTO Activity (activity_id, activity_name, hours, date_ac, ac_day, finite)
        VALUES ${activityValues.map(() => '(?, ?, ?, ?, ?, ?)').join(',')}
        `
        await connection.beginTransaction();
        await connection.execute(query, activityValues.flat());
        await connection.commit();
        connection.release();
        return res.status(200).send({ msg : 'Add Activity successfully'});

    } catch (error) {
        await connection.rollback();
        connection.release();
        return res.status(404).send({ error: error.message });
    }
}

export async function addStudent(req, res) {
    try {
        const studentValues = await req.body.map(student => {
            return [
                student.student_id, student.first_name, student.last_name,
                student.department_id, student.year, student.teacher_id, student.password
            ];
        });
        const query = `
        INSERT INTO Student (student_id, first_name, last_name, department_id, year, teacher_id, password)
        VALUES ${studentValues.map(() => '(?, ?, ?, ?, ?, ?, ?)').join(',')}
        `
        await connection.beginTransaction();
        await connection.execute(query, studentValues.flat());
        await connection.commit();
        connection.release();
        return res.status(200).send({ msg : 'Add Student successfully'});
    } catch (error) {
        await connection.rollback();
        connection.release();
        return res.status(404).send({ error: error.message });
    }
}

export async function addTeacher(req, res) {
    try {
        const teacherValues = await req.body.map(teacher => {
            return [
                teacher.teacher_id, teacher.first_name, teacher.last_name,
                teacher.department_id, teacher.position, teacher.password
            ];
        });
        const query = `
        INSERT INTO Teacher (teacher_id, first_name, last_name, department_id, position, password)
        VALUES ${teacherValues.map(() => '(?, ?, ?, ?, ?, ?)').join(',')}
        `
        await connection.beginTransaction();
        await connection.execute(query, teacherValues.flat());
        await connection.commit();
        connection.release();
        return res.status(200).send({ msg : 'Add Teacher successfully'});
    } catch (error) {
        await connection.rollback();
        connection.release();
        return res.status(404).send({ error: error.message });
    }
}

export async function getDeTeacher(req, res) {
    try {
        const query = `
            SELECT teacher_id, first_name, last_name, position, department_id FROM Teacher WHERE department_id = ?
        `
        const [teachers, fields] = await connection.execute(query, [req.body.department_id]);
        connection.release();
        return res.status(200).send(teachers);
    } catch (error) {
        connection.release();
        return res.status(404).send({ error: error.message });
    }
}

export async function getDeStudent(req, res) {
    try {
        const [students] = await connection.execute(
            'SELECT student_id, first_name, last_name, department_id, year FROM Student WHERE department_id = ?', 
            [req.body.department_id]
        );
        connection.release();
        return res.status(200).send(students);
    } catch (error) {
        connection.release();
        return res.status(404).send({ error: error.message });
    }
}

export async function getDeInFac(req, res) {
    try {
        const [departments] = await connection.execute(
            'SELECT department_id, department_name FROM Department WHERE faculty_id = ?', 
            [req.body.faculty_id]
        );
        connection.release();
        return res.status(200).send(departments);
    } catch (error) {
        connection.release();
        return res.status(404).send({ error: error.message });
    }
}



export async function addDetail(req, res) {
    try {
        const deValues = await req.body.course_de.map(detail => {
            return [
                detail.course_id, detail.gr, detail.teacher_id, detail.start_time, detail.finish_time,
                detail.day, detail.class_id, detail.finite
            ];
        });

        const query = `
        INSERT INTO course_detail (course_id, gr, teacher_id, start_time, finish_time, day, class_id, finite)
        VALUES ${deValues.map(() => '(?, ?, ?, ?, ?, ?, ?, ?)').join(',')}
        `
        await connection.beginTransaction();
        await connection.execute(query, deValues.flat());
        await connection.commit();
        connection.release();
        return res.status(200).send({ msg : 'Add Detail successfully'});

    } catch (error) {
        await connection.rollback();
        connection.release();
        return res.status(404).send({ error: error.message });
    }
}








