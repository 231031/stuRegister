import bcrypt from 'bcrypt';
import { Coursedetail } from "../models/Coursedetail.model.js";
import { Teacher } from "../models/Teacher.model.js";

export async function updateGrade() {
    try {

    } catch (error) {
        
    }
}

export async function loginTeacher(req, res) {
    try {
        let change = true;
        const { username, password } = req.body;
        const user = await Teacher.findOne({
            where: {
              teacher_id: username,
            },
        });
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
        return res.status(404).send({ error: error.message });
    }
}

export async function updateTeacher(req, res) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (token) {
            await Teacher.findOne({ where: { teacher_id: token } });
            if (req.body.password) {
                const hashPass = await bcrypt.hash(req.body.password, 10); // Hash the password
                req.body.password = hashPass;
            }
            await Teacher.update(
                req.body,
                {
                  where: {
                    teacher_id: token,
                  },
                },
              );
            return res.status(200).send({ msg : 'teacher updated successfully'});
        }
        
    } catch (error) {
        return res.status(404).send({ error: error.message });
    }
}