import { Student } from "../models/Student.model.js";
import { Sturegister } from "../models/Sturegister.model.js";
import { Coursedetail } from "../models/Coursedetail.model.js";
import { Course } from '../models/Course.model.js';
import { sequelize } from "../dbcon.js";
import { Op } from 'sequelize';
import bcrypt from 'bcrypt';
import { Availablecourse } from "../models/Avilablecourse.model.js";
import { Scholarhistory } from "../models/Scholarhistory.model.js";
import { Scholarship } from "../models/Scholarship.model.js";
import { Eduterm } from "../models/Eduterm.model.js";
import { Arractivity } from "../models/Arractivity.model.js";
import { Activity } from "../models/Activity.model.js";

export async function loginStudent(req, res) {
    try {
        let change = true;
        const { username, password } = req.body;
        const user = await Student.findByPk(username);
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
        return res.status(404).send({ error: error.message });
    }
}

export async function updateStudent(req, res) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (token) {
            await Student.findByPk(token);
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
        const user = await Student.findByPk(req.body.student_id, {
            attributes: ['student_id', 'firstName', 'lastName', 'year', 'department_id', 'gender', 'dob', 'email', 'city', 'zipCode', 'state', 'address',
                            'salary', 'parentFirstName', 'phone',
                            'parentLastName', 'parentSalary']
        });
        res.json(user);
    } catch (error) {
        return res.status(404).send({ error: error.message });
    }
}

export async function getScholar(req, res) {
    const date = new Date();
    const token = req.headers.authorization.split(" ")[1];
    try {
        const registered = await Scholarhistory.findAll({
            where: {
                student_id: token,
            },
            attributes: ['scholarship_id'],
        })
        const id = registered.map(scholar => scholar.scholarship_id);

        // filter just not registered
        const scholar = await Scholarship.findAll({
            where: { 
                scholarship_id : { [Op.notIn]: id },
                start : { [Op.lte]: date }, // start date less than present date
                end : { [Op.gte]: date }, // end date more than or equal present date - end date until 23:59
                count : {
                    [Op.lt]: sequelize.col('limit') // count < limit
                }
                // lowGrade
            },
            attributes: ['scholarship_id', 'scholarshipName']
        });
        res.json(scholar);
    } catch (error) {
        return res.status(404).send({ error: error.message });
    }
}

// not test
// update student, register scholarship
export async function registerScholar(req, res) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        await sequelize.transaction(async t => {
            await Student.update(
                req.body.info,
                {
                  where: {
                    student_id: token,
                  },
                }, { transaction : t }
            );
    
            await Scholarhistory.create(
                req.body.apply,
                { transaction : t }
            );
        });
        return res.status(200).send({ msg : 'Register scholarship and Update successfully'});
    } catch (error) {
        return res.status(404).send({ error: error.message });
    }
    
}

export async function getStuRegister(req, res) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const { department_id, year } = req.body;
        const user = await Studentregister.findAll({
            where: { student_id: token, year: year, department_id: department_id },
            attributes: ['student_id', 'firstName', 'lastName', 'year', 'department_id'],
            include: {
                model: Sturegister,
            }
        });
        res.json(user);
    } catch (error) {
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
        if (token) {
            // course already register of course available this year and this term
            const resRegister = await Sturegister.findAll({
                where: {student_id: token, year: year, term: term }
            });
            const register = resRegister.map(course => course.course_id);

            const resCourse = await Availablecourse.findAll({
                where: {
                    course_id: {
                    [Op.notIn]: register,
                    },
                    department_id : department_id,
                    year : year,
                    term : term,
                },
            });
            const course = resCourse.map(course => course.course_id);

            const resDetail = await Course.findAll({
                where: {
                    course_id: {
                    [Op.in]: course,
                    },
                    type: type,
                },
                include: { 
                    model: Coursedetail,
                    right: true, // inner join  
                    where: {
                        count: { [Op.lt]: sequelize.col('limit') } // filter group count < limit
                    }
                }
            });
            res.json(resDetail);

            // else { // not have any registered courses yet
            //     const resCourse = await Availablecourse.findAll({
            //         where: {
            //           department_id : department_id,
            //           year : year,
            //           term : term,
            //         },
            //     });
            //     const course = resCourse.map(course => course.course_id);
            //     if (course) {
            //         const resDetail = await Course.findAll({
            //             where: {
            //               course_id: {
            //                 [Op.in]: course,
            //               },
            //               type: type,
            //             },
            //             include: {
            //                 model: Coursedetail,
            //                 right: true, // inner join
            //                 where: {
            //                     count: { [Op.lt]: Coursedetail.col('limit') } // filter group count < limit
            //                 }
            //             }
            //         });
            //         res.json(resDetail);
            //     }

            // }
            
        }
    } catch (error) {
        return res.status(404).send({ error: error.message });
    }
}

// student register course 
// transaction modify tb student_register insert new row, modify tb course_detail increase count, tb edu_term increase credit
export async function registerCourse(req, res) {
    try {
        let totalCredit = 0;
        const token = req.headers.authorization.split(" ")[1];
        const { regis } = req.body;
        const result = await sequelize.transaction(async t => {
            await Sturegister.bulkCreate(
                regis,
                { transaction: t },
            );

            for (let i = 0; i < regis.length; i++) {
                const course = await Coursedetail.findOne({ 
                    where: { 
                        course_id: regis[i].course_id,
                        group: regis[i].group 
                    } 
                }, { transaction : t });

                await course.increment('count', { transaction : t });
                totalCredit = totalCredit + regis[i].credit;  
            }

            const gradeTerm = await Eduterm.findOne({
                where: { student_id: token, year: regis[0].year, term : regis[0].term }
            }, { transaction : t });

            if (gradeTerm) {
                await gradeTerm.increment('creditTerm', { by: totalCredit }, { transaction : t });
            } else {
                await Eduterm.create({
                    student_id: token,
                    year: regis[0].year,
                    term: regis[0].term,
                    creditTerm: totalCredit,
                }, { transaction : t });
            }
        });
        return res.status(200).send({ msg : 'Register Course successfully'});
    } catch (error) {
        return res.status(404).send({ error: error.message });
    }
}

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
                count: { [Op.lt] : sequelize.col('limit') },
                dateAc : { [Op.gt] : date }
            },
        });
        res.json(available);
    } catch (error) {
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