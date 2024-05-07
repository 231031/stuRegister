import { DataTypes } from "sequelize";
import { sequelize } from "../dbcon.js";
import { Coursedetail } from "./Coursedetail.model.js";
import { Sturegister } from "./Sturegister.model.js";
import { Availablecourse } from "./Avilablecourse.model.js";
const Course = sequelize.define('Course',{
    course_id : {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    department_id : {
        type: DataTypes.STRING,
        allowNull: true,
    },
    courseName : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    credit : {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    type : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
},{
    tableName: 'Course',
    timestamps: false,
    updatedAt: false,
    underscored: true,
}
)
Course.hasMany(Coursedetail, {foreignKey: 'course_id'}, { onUpdate: 'cascade', onDelete: 'cascade'});
Coursedetail.belongsTo(Course, {foreignKey: 'course_id'}, { onUpdate: 'cascade', onDelete: 'cascade' });

Course.hasMany(Sturegister, {foreignKey: 'course_id'}, { onUpdate: 'cascade' });
Sturegister.belongsTo(Course, {foreignKey: 'course_id'}, { onUpdate: 'cascade' });

Course.hasMany(Availablecourse, {foreignKey: 'course_id'}, { onUpdate: 'cascade' });
Availablecourse.belongsTo(Course, {foreignKey: 'course_id'}, { onUpdate: 'cascade' });
export { Course };

