// import { Student } from "../entity/Student.entity.js";
// import { Sturegister } from "../entity/Sturegister.entity.js";
import { Coursedetail } from "../models/Coursedetail.model.js";
import { Course } from "../models/Course.model.js";
import { Faculty } from "../models/Faculty.model.js";
import { Department } from "../models/Department.model.js";
import { Student } from "../models/Student.model.js";
import { Teacher } from "../models/Teacher.model.js";
import { Availablecourse } from "../models/Avilablecourse.model.js";
import bcrypt from 'bcrypt';
import { Scholarship } from "../models/Scholarship.model.js";

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
        await Course.bulkCreate(req.body.course);
        return res.status(200).send({ msg : 'Add Course successfully'});
    } catch (error) {
        return res.status(404).send({ error: error.message });
    }
}

export async function addAvailableCourse(req, res) {
    try {
        await Availablecourse.bulkCreate(req.body.available);
        return res.status(200).send({ msg : 'Add Available successfully'});
    } catch (error) {
        return res.status(404).send({ error: error.message });
    }
}

// add in form of array
export async function addFaculty(req, res) {
    try {
        await Faculty.bulkCreate(req.body.faculty);
        return res.status(200).send({ msg : 'Add Faculty successfully'});
    } catch (error) {
        return res.status(404).send({ error: error.message });
    }
}

export async function addDepartment(req, res) {
    try {
        await Department.bulkCreate(req.body.department);
        return res.status(200).send({ msg : 'Add Department successfully'});
    } catch (error) {
        return res.status(404).send({ error: error.message });
    }
}

export async function addScholarship(req, res) {
    try {
        await Scholarship.bulkCreate(req.body.scholarship);
        return res.status(200).send({ msg : 'Add Scholarships successfully'});
    } catch (error) {
        return res.status(404).send({ error: error.message });
    }
}

export async function addStudent(req, res) {
    try {
        await Student.bulkCreate(req.body);
        return res.status(200).send({ msg : 'Add Student successfully'});
    } catch (error) {
        return res.status(404).send({ error: error.message });
    }
}

export async function addTeacher(req, res) {
    try {
        await Teacher.bulkCreate(req.body);
        return res.status(200).send({ msg : 'Add Teacher successfully'});
    } catch (error) {
        return res.status(404).send({ error: error.message });
    }
}

export async function getDeTeacher(req, res) {
    try {
        const teachers = await Teacher.findAll({
            where: {
              department_id: req.body.department_id
            },
        });
        return res.status(200).send(teachers);
    } catch (error) {
        return res.status(404).send({ error: error.message });
    }
}

export async function getDeInFac(req, res) {
    try {
        const departments = await Department.findAll({
            where: {
              faculty_id: req.body.faculty_id,
            },
        });
        return res.status(200).send(departments);
    } catch (error) {
        return res.status(404).send({ error: error.message });
    }
}

export async function editCourse(req, res) {
    try {
        await Course.update(
            { course_id: req.body.course_id },
            {
              where: {
                course_id: 'CPE232',
              },
            },
          );
        return res.status(200).send({ msg : 'Course updated successfully'});
    } catch (error) {
        console.log(error);
        return res.status(404).send({ error: error.message });
    }
}

export async function addDetail(req, res) {
    try {
        await Coursedetail.bulkCreate(req.body.course_de);
        return res.status(200).send({ msg : 'Add Detail successfully'});
    } catch (error) {
        return res.status(404).send({ error: error.message });
    }
}








