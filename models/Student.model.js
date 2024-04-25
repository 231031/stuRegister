import { DataTypes } from "sequelize";
import { sequelize } from "../dbcon.js";
import { Eduhistory } from "./Eduhistory.model.js";
import { Sturegister } from "./Sturegister.model.js";
import { Projectstu } from "./Projectstu.model.js";

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
    teacher_id : {
        type: DataTypes.STRING,
        allowNull: false,
    }
},{
    tableName: 'Student', // Define the table name
    timestamps: false, // Exclude createdAt and updatedAt fields
    underscored: true,
}
)
Student.hasMany(Eduhistory, {foreignKey: 'student_id', onUpdate: 'cascade', onDelete: 'cascade' });
Eduhistory.belongsTo(Student, {foreignKey: 'student_id', onUpdate: 'cascade', onDelete: 'cascade' });

Student.hasMany(Sturegister, {foreignKey: 'student_id', onUpdate: 'cascade' });
Sturegister.belongsTo(Student, { foreignKey: 'student_id', onUpdate: 'cascade' });

Student.hasMany(Projectstu, {foreignKey: 'student_id', onUpdate: 'cascade' });
Projectstu.belongsTo(Student, {foreignKey: 'student_id', onUpdate: 'cascade' });

export { Student };