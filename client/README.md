# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

-color sky name same as old one sky-600 and it causes error
-sky-xxx not have any color too
-already fixed color code

-back student register courses transaction
-display in personal

-edit sending token of student
-edit routes of student -> Studentpersonal-fill information after resetting password first login, Studentupdate-update some personal information, Studenteditpersonal-student can fill information of parent, Studentaddeduhis-add education history
-edit information nav of student
-edit container, update color code, flex wrap of form in component

-student register elective courses
-admin add scholarship page 
-edit model - Scholarship->not have teacher, Teacher->remove relation with scholarship, Coursedetail->edit data type 

-adminController insert (update to SQL)
-edit name of some columns in tb course_detail, Scholarship, stu_register, Activity (due to reserved words)
group -> gr, 
limit -> finite 
-edit name in formik form, name in validation schema

-add new column in tb Course 'description'


-16/5/67
-Student
-fetch advanced analysis -> The number of people in each faculty who apply in each activity (6 activity) (getFacActivity)
-advanced analysis back -> get average hours and average gpax of students who get scholarship from last year (getAvgScholar)


-Committee
-add home page of committee
-edit fetch tablestu and infostu get department_name and faculty_name
-add tb analysis in Committeetable, add scholar_history of each student in Committeestu (all rejected and approved)

-advanced analysis back -> the number of students in each faculty who get scholarship in present year (getCountFaculty)
-advanced analysis back -> get average salary's father of students in each faculty (getAvgF)
-advanced analysis back -> get average salary's mother of students in each faculty (getAvgM)

-Teacher
-edit submitscore page (add department_name, faculty_name)
-add register information page after login first time connect to backend (not tested yet)
-edit Teacherpersonal connect to backend (not tested yet)


-Admin
-link table to path for editing
-edit Courseedit component
-create component and path for update teacher select from tableteacher
-create component and path for update student select from tablestudent and connect to backend
-use for update (first_name, last_name, id_card, gender, age)

-Validation
-seperate schema self, admincourse,
-change schema name

-18/05/67

table
-update tb Student, Teacher, Course (add column status) for tell who are available (not have deleted), chnage year to first year of studying
-update tb Teacher (add column about information)

Student
-connect Coursedetail to backend

-Admin
-update component in tb show all students, teachers, courses
-update component for adding data fetch just status=1
-Course change status delete available_course of this course_id
-Teacher change status -> update course_detail and Student of this teacher to another

Edit Schema
-edu_term add column status (use to tell have any teacher start grade or not -> for use in calculating gpax)

Student
-fetch advanced analysis avg_gpax and avg_hours of each closed scholarship (Studenthome)*
-fixed filter year in getStatusScholar used poso instead
-fixed Studentlogin
-fetch advanced analysis the number of students in each faculty who will attend this activity (StudentAtten)*

Teacher
-fetch advanced analysis getAvgCourse avg_grade in each course (Teacherhome)*

Committee
-advanced analysis Committeehome 2, Committeetable