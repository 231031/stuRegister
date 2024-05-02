import * as Yup from 'yup';

// years-- faculty-- filed-- major- number---
const student_id_pattern = /^(6[0-6])([A-Z]{3}|[A-Z]{2})([0-9]{3})$/;
const teacher_id_pattern = /^([T])(6[0-8])([A-Z]{3}|[A-Z]{2})([0-9]{3})$/;
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

const FacSchema = Yup.object().shape({
    faculty: Yup.array().of(
        Yup.object().shape({
            faculty_id: Yup.string()
                .matches(/^[A-Z]+$/, 'All must be Capitalize letters')
                .min(1, 'Too Short!')
                .required('ID Required'),
            facultyName: Yup.string()
                .matches(/^[A-Za-z]+$/, 'All must be letters')
                .min(2, 'Too Short!')
                .max(30, 'Too Long!')
                .required('Name Required'),
        })
      )
});

const PersonalSchema = Yup.object().shape({
    ...NameSchema.fields,
    salary: Yup.number()
        .required('Required'),
    parentFirstName: Yup.string()
        .required('required'),
    parentLastName: Yup.string()
        .required('required'),
    parentSalary: Yup.number()
        .required('required'),
});

const PasswordSchema = Yup.object().shape({
    password: Yup.string()
        .min(8, 'Please Enter less then 8 letters')
        .required('Password Required'),
    newPassword: Yup.string()
        .required('Required')
        .oneOf([Yup.ref('password'), null], 'Passwords do not match'),
});

const AddStuSchema = Yup.object().shape({
    student: Yup.array().of(
        Yup.object().shape({
            ...NameSchema.fields,
        })
    )
    
});

const TeacherSchema = Yup.object().shape({
    teacher: Yup.array().of(
        Yup.object().shape({
            ...NameSchema.fields,
            teacher_id: Yup.string()
                .required('Required')
                .matches(teacher_id_pattern, 'Teacher ID pattern ex. T67EE001'),
            position: Yup.string()
                .required('Required')
        })
    )
});

const LoginSchema = Yup.object().shape({
    username: Yup.string()
        .required('Required'),
    password: Yup.string()
        .required('Required'),
});

const UpdateSchema = Yup.object().shape({
    ...NameSchema.fields,
});

const CourseSchema = Yup.object().shape({
    course: Yup.array().of(
        Yup.object().shape({
            course_id: Yup.string()
                .matches(course_id_pattern, 'Course ID pattern XXX000')
                .required('Required'),
            courseName: Yup.string().required('Required'),
            credit: Yup.number().required('Required'),   
            teacher_id: Yup.string().required('Required'),
        })
    )
    
});

const AvailableSchema = Yup.object().shape({
    available: Yup.array().of(
        Yup.object().shape({
            course_id: Yup.string()
                .required('Required'),
            year: Yup.number().required('Required'),
            term: Yup.number().required('Required'),
        })
    )
    
});

const DepartmentSchema = Yup.object().shape({
    course: Yup.array().of(
        Yup.object().shape({
            department_id: Yup.string().required('Required')
                .matches(/^[A-Z]+$/, 'All must be Capitalize letters'),
            departmentName: Yup.string().required('Required').min(3, 'Too Short!')
                .matches(/^[A-Za-z]+$/, 'All must be letters'),
        })
    )
    
});

const DetailSchema = Yup.object().shape({
    course_de: Yup.array().of(
        Yup.object().shape({
            teacher_id: Yup.string().required('Required'),
            class_id: Yup.string()
                .required('Required'),
            group: Yup.number()
                .required('Required')
                .min(1, 'group number > 0').max(5, 'too many!'), 
            limit: Yup.number()
                .required('Required'),
            day: Yup.string().required('Required'),
            startTime: Yup.string()
                .matches(time_pattern, 'pattern 00:00 - 23:59')
                .required('Required'), 
            finishTime: Yup.string()
                .matches(time_pattern, 'pattern 00:00 - 23:59')
                .required('Required'),
        })
    )
     
});





export { PersonalSchema, LoginSchema, UpdateSchema, CourseSchema, DetailSchema, FacSchema, DepartmentSchema, TeacherSchema,
        AddStuSchema, AvailableSchema, NameSchema, PasswordSchema  };

