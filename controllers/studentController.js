// import { Student } from "../entity/Student.entity.js";
// import { Sturegister } from "../entity/Sturegister.entity.js";
import { Coursedetail } from "../models/Coursedetail.model.js";
import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import ENV from '../fig.js';

export async function registerStudent(req, res) {
    try {
       
        
    } catch (error) {
        return res.status(404).send({ error: error.message });
    }
}

export async function loginStudent(req, res) {
    try {
        const { username, password } = req.body;
    

        // if (user !== null) {
        //     bcrypt.compare(password, user.password)
        //     .then(match => {
        //         if (!match) return res.status(400).send({ error : "invalid password!"});
        //         return res.status(200).send({
        //             msg : "Login successful",
        //             username : user.student_id,
        //         })
        //     })
        // } 
        // else res.json(user);
        
    } catch (error) {
        return res.status(404).send({ error: error.message });
    }
}

export async function updateStudent(req, res) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        // if (token) {
        //     const user = await myDataSource.getRepository(Student).findOneBy({
        //         student_id: token,
        //     })
        //     myDataSource.getRepository(Student).merge(user, req.body)
        //     await myDataSource.getRepository(Student).save(user)
        //     return res.status(200).send({ msg : 'Student updated successfully'});
        // }
        
    } catch (error) {
        return res.status(404).send({ error: error.message });
    }
}

export async function registerCourse(req, res) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        // if (token) {
        //     const user = await myDataSource.getRepository(Student).findOneBy({
        //         student_id: token,
        //     })
        //     myDataSource.getRepository(Student).merge(user, req.body)
        //     await myDataSource.getRepository(Student).save(user)
        //     return res.status(200).send({ msg : 'Student updated successfully'});
        // }
        
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