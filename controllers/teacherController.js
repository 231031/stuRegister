import bcrypt from 'bcrypt';
import { Coursedetail } from "../models/Coursedetail.model.js";
import { Teacher } from "../models/Teacher.model.js";

import pool from '../dbcon.js';
const connection = await pool.getConnection();

export async function updateGrade() {
    try {

    } catch (error) {
        connection.release();
        return res.status(404).send({ error: error.message });
    }
}

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

// continue
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

export async function editCourse(req, res) {
    try {
        await connection.execute(
            'UPDATE Course SET course_name = ?, description = ? WHERE course_id = ?', 
            [req.body.course_id, req.body.description]
        );
        connection.release();
        return res.status(200).send({ msg : 'Course updated successfully'});
        
    } catch (error) {
        connection.release();
        return res.status(404).send({ error: error.message });
    }
}