import { DataTypes } from "sequelize";
import { sequelize } from "../dbcon.js";
import { Student } from "./Student.model.js";
import { Projectteacher } from "./Projectteacher.model.js";
const Teacher = sequelize.define('Teacher',{
    teacher_id : {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    firstName : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName : {
        type: DataTypes.STRING,
        allowNull: false,
    },
},{
    tableName: 'Teacher', // Define the table name
    timestamps: false, // Exclude createdAt and updatedAt fields
    underscored: true,
});


Teacher.hasMany(Student, {foreignKey: 'teacher_id', onUpdate: 'cascade' });
// Student.belongsTo(Teacher, {foreignKey: 'teacher_id', onUpdate: 'cascade' });

Projectteacher.hasMany(Teacher, {foreignKey: 'teacher_id', onUpdate: 'cascade' });
// Teacher.belongsTo(Projectteacher, {foreignKey: 'teacher_id', onUpdate: 'cascade' });

export { Teacher };