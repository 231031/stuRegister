import { DataTypes } from "sequelize";
import { sequelize } from "../dbcon.js";
import { Student } from "./Student.model.js";
import { Projectteacher } from "./Projectteacher.model.js";
import { Scholarship } from "./Scholarship.model.js";
import { Coursedetail } from "./Coursedetail.model.js";

const Teacher = sequelize.define('Teacher',{
    teacher_id : {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    course_id : {
        type: DataTypes.STRING,
        allowNull: false,
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
},{
    tableName: 'Teacher',
    timestamps: false,
    updatedAt: false,
    underscored: true,
});


Teacher.hasMany(Student, {foreignKey: 'teacher_id', onUpdate: 'cascade' });
Student.belongsTo(Teacher, {foreignKey: 'teacher_id', onUpdate: 'cascade' });

Teacher.hasMany(Projectteacher, { foreignKey: 'teacher_id', onUpdate: 'cascade' });
Projectteacher.belongsTo(Teacher, {foreignKey: 'teacher_id', onUpdate: 'cascade' });

Teacher.hasMany(Scholarship, { foreignKey: 'teacher_id', onUpdate: 'cascade' });
Scholarship.belongsTo(Teacher, {foreignKey: 'teacher_id', onUpdate: 'cascade' });

Teacher.hasMany(Coursedetail, { foreignKey: 'teacher_id', onUpdate: 'cascade', onDelete: 'restrict' });
Coursedetail.belongsTo(Teacher, {foreignKey: 'teacher_id', onUpdate: 'cascade', onDelete: 'restrict' });

export { Teacher };