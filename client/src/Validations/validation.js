import * as Yup from 'yup';

// years-- department_id--- number---
// const student_id_pattern = /^(6[0-6])([A-Z]{3}|[A-Z]{2})([0-9]{3})$/;

// T years-- department_id--- number---
const teacher_id_pattern = /^([T])([3-6][0-9])([A-Z]{3}|[A-Z]{2})([0-9]{3})$/;
const activity_id_pattern = /^([A][C][C])([0-9]|[0-9]{2}|[0-9]|3)$/;
const year_pattern = /^([19|20][0-9][0-9]{2})$/;

// department_id--- number---
const course_id_pattern = /^([A-Z]{3}|[A-Z]{2})([0-9]{3})$/;
const time_pattern = /^(?:2[0-3]|[01][0-9]):[0-5][0-9]$/;
const scholar_id_pattern = /^([S])([0-9]{3})$/;

const NameSchema = Yup.object().shape({
    first_name: Yup.string()
        .matches(/^[A-Za-z]+$/, 'All must be letters')
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('First Name Required'),
    last_name: Yup.string()
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
            faculty_name: Yup.string()
                .matches(/^[A-Za-z ]+$/, 'All must be letters')
                .min(2, 'Too Short!')
                .max(30, 'Too Long!')
                .required('Name Required'),
        })
      )
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

const ScholarshipSchema = Yup.object().shape({
    scholarship: Yup.array().of(
        Yup.object().shape({
            scholarship_id: Yup.string()
                .required('Required')
                .matches(scholar_id_pattern, 'ID pattern ex. S001'),
            scholarship_name: Yup.string()
                .required('Required'),
            finite: Yup.number().required('Required').typeError('Must be a number'),
            low_grade: Yup.number().required('Required').typeError('Must be a number'),
            start: Yup.date()
                .required('Required'),
            end: Yup.date()
                .required('Required'),

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



const InfoSchema = Yup.object().shape({
    email: Yup.string().required('Required').email('xxx@gmail.com'),
    phone: Yup.string().required('Required'),
    city: Yup.string().required('Required').min(3, 'too short!'),
    zip_code: Yup.string().required('Required').min(4, 'wrong zip code'),
    address: Yup.string().required('Required').min(5, 'too short!'),
});


const UpdateSchema = Yup.object().shape({
    ...InfoSchema.fields,

    f_email: Yup.string()
        .required('required').email('xxx@gmail.com'),
    f_salary: Yup.number()
        .required('Required').typeError('Must be a number'),
    f_phone: Yup.string()
        .required('required').max(10, 'xxxxxxxxxx'),

    m_email: Yup.string()
        .required('required').email('xxx@gmail.com'),
    m_salary: Yup.number()
        .required('Required').typeError('Must be a number'),
    m_phone: Yup.string()
        .required('required').max(10, 'xxxxxxxxxx'),

});


const SelfSchema = Yup.object().shape({
    // self
    id_card: Yup.string().required('Required'),
    gender: Yup.string().required('Required'),
    date: Yup.string().required('Required'),
    month: Yup.string().required('Required'),
    year: Yup.string().required('Required').matches(year_pattern, '19XX - 20XX'),
    age: Yup.number().required('Required').typeError('Must be a number'),       
});

const TeacherPerSchema = Yup.object().shape({
    ...SelfSchema.fields,
    ...InfoSchema.fields,
});

const PersonalSchema = Yup.object().shape({
    ...UpdateSchema.fields,
    // self
    ...SelfSchema.fields,
   
    // father
    f_first_name: Yup.string()
        .required('required'),
    f_last_name: Yup.string()
        .required('required'),
    f_id: Yup.string()
        .required('required'),
    f_age: Yup.number().required('Required').typeError('Must be a number'),
    // monther
    m_first_name: Yup.string()
        .required('required'),
    m_last_name: Yup.string()
        .required('required'),
    m_id: Yup.string()
        .required('required'),
    m_age: Yup.number().required('Required').typeError('Must be a number'),
    
});

const CourseSchema = Yup.object().shape({
    course: Yup.array().of(
        Yup.object().shape({
            course_id: Yup.string()
                .matches(course_id_pattern, 'Course ID pattern XXX000')
                .required('Required'),
            course_name: Yup.string().required('Required'),
            credit: Yup.number().required('Required').typeError('Must be a number'),   
            type: Yup.string().required('Required'),
        })
    )
    
});

const CourseUpdateSchema = Yup.object().shape({
    course_name: Yup.string()
        .required('required').min(3, 'too short!'),
    description: Yup.string()
        .required('required').min(10, 'too short!'),
});

const AdminCourseSchema = Yup.object().shape({
    course_name: Yup.string()
        .required('required').min(3, 'too short!'),
    credit: Yup.number().required('Required').typeError('Must be a number'),
});

const ActivitySchema = Yup.object().shape({
    activity: Yup.array().of(
        Yup.object().shape({
            activity_id: Yup.string()
                .matches(activity_id_pattern, 'Activity ID pattern AC000')
                .required('Required'),
            activity_name: Yup.string().required('Required'),
            date_ac: Yup.date().required('Required'),
            ac_day: Yup.number().required('Required').typeError('Must be a number'),
            finite: Yup.number().required('Required').typeError('Must be a number'),
        })
    )
    
});

const AvailableSchema = Yup.object().shape({
    available: Yup.array().of(
        Yup.object().shape({
            course_id: Yup.string()
                .required('Required'),
            year: Yup.number().required('Required').typeError('Must be a number'),
            term: Yup.number().required('Required').typeError('Must be a number'),
        })
    )
    
});

const DepartmentSchema = Yup.object().shape({
    department: Yup.array().of(
        Yup.object().shape({
            department_id: Yup.string().required('Required')
                .matches(/^[A-Z]+$/, 'All must be Capitalize letters'),
            department_name: Yup.string().required('Required').min(3, 'Too Short!')
                .matches(/^[A-Za-z ]+$/, 'All must be letters'),
        })
    )
    
});

const DetailSchema = Yup.object().shape({
    course_de: Yup.array().of(
        Yup.object().shape({
            teacher_id: Yup.string().required('Required'),
            class_id: Yup.string()
                .required('Required'),
            gr: Yup.number('Required Number')
                .required('Required')
                .min(1, 'group number > 0').max(5, 'too many!'), 
            finite: Yup.number('Required Number')
                .required('Required'),
            day: Yup.string().required('Required'),
            start_time: Yup.string()
                .matches(time_pattern, 'pattern 00:00 - 23:59')
                .required('Required'), 
            finish_time: Yup.string()
                .matches(time_pattern, 'pattern 00:00 - 23:59')
                .required('Required'),
        })
    )
     
});





export { PersonalSchema, LoginSchema, UpdateSchema, CourseSchema, DetailSchema, FacSchema, DepartmentSchema, TeacherSchema, SelfSchema, AdminCourseSchema,
        AddStuSchema, AvailableSchema, NameSchema, PasswordSchema, ScholarshipSchema, ActivitySchema, CourseUpdateSchema, InfoSchema, TeacherPerSchema };

