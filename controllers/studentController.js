import { Student } from "../models/Student.model.js";
import { Sturegister } from "../models/Sturegister.model.js";
import { Coursedetail } from "../models/Coursedetail.model.js";
import { sequelize } from "../dbcon.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ENV from '../fig.js';

export async function registerStudent(req, res) {
    try {
        await Student.create(req.body);
        return res.status(200).send({ msg : 'Add Student successfully'}); 
    } catch (error) {
        return res.status(404).send({ error: error.message });
    }
}

export async function loginStudent(req, res) {
    try {
        let change = true;
        const { username, password } = req.body;
        const user = await Student.findOne({
            where: {
              student_id: username,
            },
        });
        if (user !== null) {
            if (password === user.password && username === user.password) {
                change = false;
                return res.status(200).send({
                    msg : "Please change password and Fill personal information",
                    username : user.student_id,
                    setPass : change,
                })
            } 
            bcrypt.compare(password, user.password)
            .then(match => {
                if (!match) return res.status(400).send({ error : "invalid password!"});
                return res.status(200).send({
                    msg : "Login successful",
                    username : user.student_id,
                    setPass : change,
                })
            }) 
        } 
        else res.json(user);
        
    } catch (error) {
        return res.status(404).send({ error: error.message });
    }
}

export async function updateStudent(req, res) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (token) {
            await Student.findOne({ where: { student_id: token } });
            if (req.body.password) {
                const hashPass = await bcrypt.hash(req.body.password, 10); // Hash the password
                req.body.password = hashPass;
            }
            await Student.update(
                req.body,
                {
                  where: {
                    student_id: token,
                  },
                },
              );
            return res.status(200).send({ msg : 'Student updated successfully'});
        }
        
    } catch (error) {
        return res.status(404).send({ error: error.message });
    }
}

export async function getInfo(req, res) {
    try {
        const user = await Student.findOne({ where: { student_id: username } });
        res.json(user);
    } catch (error) {
        return res.status(404).send({ error: error.message });
    }
}
export async function registerCourse(req, res) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (token) {
            await Sturegister.bulkCreate(req.body);
            // search course and group from course_detail count+1;

            return res.status(200).send({ msg : 'Register course successfully'});
        }
        
    } catch (error) {
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