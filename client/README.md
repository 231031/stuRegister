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

- have not added in comHelper yet
-advanced analysis back -> the number of students in each faculty who get scholarship in present year (getCountFaculty)
-advanced analysis back -> get average salary's father of students in each faculty (getAvgF)
-advanced analysis back -> get average salary's mother of students in each faculty (getAvgM)

-Teacher
-edit submitscore page (add department_name, faculty_name)