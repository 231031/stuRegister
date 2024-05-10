import { DataTypes } from "sequelize";
import { sequelize } from "../dbcon.js";
import { Eduhistory } from "./Eduhistory.model.js";
import { Sturegister } from "./Sturegister.model.js";
import { Scholarhistory } from "./Scholarhistory.model.js";
import { Eduterm } from "./Eduterm.model.js";
import { Arractivity } from "./Arractivity.model.js";

const Student = sequelize.define('Student',{
    student_id : {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    password : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    firstName : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    year : {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    salary : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    teacher_id : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    department_id : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    hours : {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },

    gender: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    idCard: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dob: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    address: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    zipCode: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    f_first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    f_last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    f_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    f_email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    f_salary: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    f_age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    f_phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    m_first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    m_last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    m_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    m_email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    m_salary: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    m_age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    m_phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},{
    tableName: 'Student',
    timestamps: false,
    updatedAt: false,
    underscored: true,
}
)
Student.hasMany(Eduhistory, {foreignKey: 'student_id', onUpdate: 'cascade', onDelete: 'cascade' });
Eduhistory.belongsTo(Student, {foreignKey: 'student_id', onUpdate: 'cascade', onDelete: 'cascade' });

Student.hasMany(Sturegister, {foreignKey: 'student_id', onUpdate: 'cascade', onDelete: 'restrict' });
Sturegister.belongsTo(Student, { foreignKey: 'student_id', onUpdate: 'cascade', onDelete: 'restrict' });

Student.hasMany(Scholarhistory, {foreignKey: 'student_id', onUpdate: 'cascade', onDelete: 'restrict' });
Scholarhistory.belongsTo(Student, {foreignKey: 'student_id', onUpdate: 'cascade', onDelete: 'restrict' });

Student.hasMany(Eduterm, {foreignKey: 'student_id', onUpdate: 'cascade', onDelete: 'cascade' });
Eduterm.belongsTo(Student, {foreignKey: 'student_id', onUpdate: 'cascade', onDelete: 'cascade' });

Student.hasMany(Arractivity, {foreignKey: 'student_id', onUpdate: 'cascade', onDelete: 'cascade' });
Arractivity.belongsTo(Student, {foreignKey: 'student_id', onUpdate: 'cascade', onDelete: 'cascade' });


export { Student };