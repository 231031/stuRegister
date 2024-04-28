import { DataTypes } from "sequelize";
import { sequelize } from "../dbcon.js";
import { Eduhistory } from "./Eduhistory.model.js";
import { Sturegister } from "./Sturegister.model.js";
import { Projectstu } from "./Projectstu.model.js";
import { Scholarhistory } from "./Scholarhistory.model.js";
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
    teacher_id : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    department_id : {
        type: DataTypes.STRING,
        allowNull: false,
    }
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

Student.hasMany(Projectstu, {foreignKey: 'student_id', onUpdate: 'cascade', onDelete: 'restrict' });
Projectstu.belongsTo(Student, {foreignKey: 'student_id', onUpdate: 'cascade', onDelete: 'restrict' });

Student.hasMany(Scholarhistory, {foreignKey: 'student_id', onUpdate: 'cascade', onDelete: 'restrict' });
Scholarhistory.belongsTo(Student, {foreignKey: 'student_id', onUpdate: 'cascade', onDelete: 'restrict' });

export { Student };