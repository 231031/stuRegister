import * as Yup from 'yup';

// years-- faculty-- filed-- major- number---
const student_id_pattern = /^(6[0-6]|0[0-9]|1[0-5])(0[0-9]|1[0-9])([0-9]{2})([01])([0-9]{3})$/;
const course_id_pattern = /^([A-Z]{3})([0-9]{3})$/;
const time_pattern = /^(?:2[0-3]|[01][0-9]):[0-5][0-9]$/;


const NameSchema = Yup.object().shape({
    firstName: Yup.string()
        .matches(/^[A-Za-z]+$/, 'All must be letters')
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('First Name Required'),
    lastName: Yup.string()
        .matches(/^[A-Za-z]+$/, 'All must be letters')
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Last Name Required'),
});

const StudentSchema = Yup.object().shape({
    ...NameSchema.fields,
    student_id: Yup.string()
        .matches(student_id_pattern, 'Student ID does not match')
        .required('Required'),
    password: Yup.string()
        .min(8, 'Please Enter less then 8 letters')
        .required('Password Required'),
});

const LoginSchema = Yup.object().shape({
    username: Yup.string()
        .matches(student_id_pattern, 'Student ID does not match pattern')
        .required('Required'),
});

const UpdateSchema = Yup.object().shape({
    ...NameSchema.fields,
});

const CourseSchema = Yup.object().shape({
    course_id: Yup.string()
        .matches(course_id_pattern, 'Course ID does not match pattern XXX000')
        .required('Required'),
    courseName: Yup.string()
        .required('Required'),
});

const DetailSchema = Yup.object().shape({
    teacher_id: Yup.string()
        .required('Required'),
    class_id: Yup.string()
        .required('Required'),
    major: Yup.string()
        .required('Required'), 
    group: Yup.number()
        .required('Required'), 
    limit: Yup.number()
        .required('Required'),
    day: Yup.string()
        .required('Required'),
    startTime: Yup.string()
        .matches(time_pattern, 'Time does not match pattern 00:00 - 23:59')
        .required('Required'), 
    finishTime: Yup.string()
        .matches(time_pattern, 'Time does not match pattern 00:00 - 23:59')
        .required('Required'), 
});





export { StudentSchema, LoginSchema, UpdateSchema, CourseSchema, DetailSchema };

