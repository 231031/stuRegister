import { DataTypes } from "sequelize";
import { sequelize } from "../dbcon.js";
import { Coursedetail } from "./Coursedetail.model.js";
import { Sturegister } from "./Sturegister.model.js";
const Course = sequelize.define('Course',{
    course_id : {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
        courseName : {
        type: DataTypes.STRING,
        allowNull: false,
    },
},{
    tableName: 'Course', // Define the table name
    timestamps: false, // Exclude createdAt and updatedAt fields
    underscored: true,
}
)
Course.hasMany(Coursedetail, {foreignKey: 'course_id'}, { onUpdate: 'cascade', onDelete: 'cascade'});
Coursedetail.belongsTo(Course, {foreignKey: 'course_id'}, { onUpdate: 'cascade', onDelete: 'cascade' });

Course.hasMany(Sturegister, {foreignKey: 'course_id'}, { onUpdate: 'cascade' });
Sturegister.belongsTo(Course, {foreignKey: 'course_id'}, { onUpdate: 'cascade' });
export { Course };

