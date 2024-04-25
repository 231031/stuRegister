// import { Student } from "../entity/Student.entity.js";
// import { Sturegister } from "../entity/Sturegister.entity.js";
import { Coursedetail } from "../models/Coursedetail.model.js";
import { Course } from "../models/Course.model.js";

export async function addCourse(req, res) {
    try {
        await Course.create(req.body);
        return res.status(200).send({ msg : 'Add Course successfully'});
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
        await Coursedetail.create(req.body);
        return res.status(200).send({ msg : 'Add Detail successfully'});
    } catch (error) {
        return res.status(404).send({ error: error.message });
    }
}








