// import { DataTypes } from "sequelize";
// import { sequelize } from "../dbcon.js";
// import { Student } from "./Student.model.js";
// import { Teacher } from "./Teacher.model.js";
// import { Course } from "./Course.model.js";
// import { Availablecourse } from "./Avilablecourse.model.js";

// const Department = sequelize.define('Department',{
//     department_id : {
//         type: DataTypes.STRING,
//         allowNull: false,
//         primaryKey: true,
//     },
//     faculty_id : {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     departmentName : {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
// },{
//     tableName: 'Department',
//     timestamps: false, 
//     updatedAt: false, 
//     underscored: true,
// });

// Department.hasMany(Student, { foreignKey: 'department_id', onUpdate: 'cascade', onDelete: 'restrict' });
// Student.belongsTo(Department, { foreignKey: 'department_id', onUpdate: 'cascade', onDelete: 'restrict' });

// Department.hasMany(Teacher, { foreignKey: 'department_id', onUpdate: 'cascade', onDelete: 'restrict' });
// Teacher.belongsTo(Department, { foreignKey: 'department_id', onUpdate: 'cascade', onDelete: 'restrict' });

// Department.hasMany(Course, { foreignKey: 'department_id', onUpdate: 'cascade' });
// Course.belongsTo(Department, { foreignKey: 'department_id', onUpdate: 'cascade' });

// Department.hasMany(Availablecourse, { foreignKey: 'department_id', onUpdate: 'cascade' });
// Availablecourse.belongsTo(Department, { foreignKey: 'department_id', onUpdate: 'cascade' });

// export { Department };

