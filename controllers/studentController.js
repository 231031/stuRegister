import { Sturegister } from "../models/Sturegister.model.js";
import { Coursedetail } from "../models/Coursedetail.model.js";
import { sequelize } from "../dbcon.js";
import { Op } from 'sequelize';
import bcrypt from 'bcrypt';
import { Arractivity } from "../models/Arractivity.model.js";
import { Activity } from "../models/Activity.model.js";

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

export async function getInfo(req, res) {
    try {
        const query = `
            SELECT student_id, first_name, last_name, year, department_id, gender, dob, email, city, zip_code, state, address,
            salary, phone FROM Student WHERE student_id = ?
        `
        const [user] = await connection.execute(query, [req.body.student_id]);
        connection.release();
        res.json(user[0]);
    } catch (error) {
        connection.release();
        return res.status(404).send({ error: error.message });
    }
}

export async function getScholar(req, res) {
    const date = new Date();
    const token = req.headers.authorization.split(" ")[1];

    try { // low_grade
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

// not fixed yet
export async function getStuRegister(req, res) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const { department_id, year } = req.body;
        const user = await Sturegister.findAll({
            where: { student_id: token, year: year, department_id: department_id },
            attributes: ['student_id', 'firstName', 'lastName', 'year', 'department_id'],
            include: {
                model: Sturegister,
            }
        });
        res.json(user);
    } catch (error) {
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
                    'finite', course_detail.finite,
                    'count', course_detail.count
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
                'INSERT INTO stu_register (student_id, year, term, credit_term) VALUES (?, ?, ?, ?)',  
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


// continue
export async function getActivity(req, res) {
    const date = new Date();
    const token = req.headers.authorization.split(" ")[1];
    try {
        const arr = await Arractivity.findAll({
            where: { student_id : token },
            attributes: ['activity_id']
        });
        const activity = arr.map(ac => ac.activity_id);
        const available = await Activity.findAll({
            where: {
                activity_id: {
                    [Op.notIn]: activity,
                },
                count: { [Op.lt] : sequelize.col('finite') },
                dateAc : { [Op.gt] : date }
            },
        });
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
        await sequelize.transaction(async t => {
            await Arractivity.create(
                arr_activity,
                { transaction: t },
            );

            const activity = await Activity.findByPk(
                arr_activity.activity_id,
                { transaction : t }
            );

            await activity.increment('count', { transaction : t });
        });
        return res.status(200).send({ msg : 'Register Activity successfully'});
    } catch (error) {
        connection.release();
        return res.status(404).send({ error: error.message });
    }
}







// transaction
// modify Studentregister (group), Coursedetail (count)
export async function changeGroup(req, res) {
    try {
       
        
    } catch (error) {
        return res.status(404).send({ error: error.message });
    }
}

// insert Studentregister, modify Coursedetail (count)
export async function addCourse(req, res) {
    try {
        const result = await sequelize.transaction(async tran => {

            await Sturegister.create(req.body, { transaction : tran });
            const course = await Coursedetail.findOne({ 
                where: { course_id: req.body.course_id } 
            }, { transaction : tran });
            await course.increment('count', { transaction : tran });

        });


        
        return res.status(200).send({ msg : 'Add course successfully'});
    } catch (error) {
        return res.status(404).send({ error: error.message });
    }
}

// delete Studentregister, modify Coursedetail (count)
export async function delCourse(req, res) {
    try {
       
        
    } catch (error) {
        return res.status(404).send({ error: error.message });
    }
}

// example

// export async function transaction(req, res) {
//     const queryRunner = myDataSource.createQueryRunner();
//     try {
//         const course1 = req.body;
//         console.log(course1);
//         await queryRunner.connect();
//         await queryRunner.startTransaction()
//         await queryRunner.manager.save(Course, { 
//             course_id: 'CPE223',
//             courseName: 'comarch',
//          });
//         await queryRunner.manager.save(Coursedetail, course1);
//         await queryRunner.commitTransaction();
//         res.status(200).send({ msg: "Transaction completed" });
//     } catch (error) {
//         await queryRunner.rollbackTransaction()
//         return res.status(404).send({ error: error.message });
//     } finally {
//         await queryRunner.release()
//     }
// }