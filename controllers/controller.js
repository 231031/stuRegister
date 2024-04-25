// import { Student } from "../entity/Student.entity.js";
// import { Sturegister } from "../entity/Sturegister.entity.js";
import { Coursedetail } from "../models/Coursedetail.model.js";
import { Course } from "../models/Course.model.js";

export async function getAllStudents(req, res) {
    try {
        // const students = await myDataSource.getRepository(Student).find()
        res.json(students)
        
    } catch (error) {
        return res.status(404).send({ error: error.message });
    }
}

export async function getAllCourses(req, res) {
    try {
        const courses = await Course.findAll();
        res.json(courses)
        
    } catch (error) {
        return res.status(404).send({ error: error.message });
    }
}

export async function getAllCoursesDe(req, res) {
    try {
        // const courses_de = await myDataSource.getRepository(Coursedetail).find()
        res.json(courses_de)
        
    } catch (error) {
        return res.status(404).send({ error: error.message });
    }
}