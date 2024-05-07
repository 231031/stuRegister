import { Student } from "../models/Student.model.js";
import { Sturegister } from "../models/Sturegister.model.js";
import { Coursedetail } from "../models/Coursedetail.model.js";
import { Course } from "../models/Course.model.js";
import { Faculty } from "../models/Faculty.model.js";
import { Department } from "../models/Department.model.js";
import { Teacher } from "../models/Teacher.model.js";
import pool from '../dbcon.js';

export async function getAllStudents(req, res) {
    try {
        const connection = await pool.getConnection();
        const [students, fields] = await connection.execute(
            'SELECT student_id, first_name, last_name, year FROM Student'
        );
        connection.release();
        res.json(students);
        
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
        const courses_de = await Coursedetail.findAll();
        res.json(courses_de)
        
    } catch (error) {
        return res.status(404).send({ error: error.message });
    }
}

export async function getAllFaculty(req, res) {
    try {
        const faculty = await Faculty.findAll();
        res.json(faculty)
        
    } catch (error) {
        return res.status(404).send({ error: error.message });
    }
}

export async function getAllDepartments(req, res) {
    try {
        const department = await Department.findAll();
        res.json(department)
        
    } catch (error) {
        return res.status(404).send({ error: error.message });
    }
}

export async function getAllTeachers(req, res) {
    try {
        const teachers = await Teacher.findAll({
            attributes: ['teacher_id', 'firstName', 'lastName', 'year']
        });
        res.json(teachers)
        
    } catch (error) {
        return res.status(404).send({ error: error.message });
    }
}