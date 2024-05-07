import { DataTypes } from "sequelize";
import { sequelize } from "../dbcon.js";
// import { Course } from "./Course.model.js";

const Coursedetail = sequelize.define('Coursedetail',{
    course_id : {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    gr : {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    teacher_id : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    startTime : {
        type: DataTypes.TIME,
        allowNull: false,
    },
    finishTime : {
        type: DataTypes.TIME,
        allowNull: false,
    },
    day : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    class_id : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    finite : {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    count : {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
},{
    tableName: 'course_detail',
    updatedAt: false,
    timestamps: false,
    underscored: true,
})


export { Coursedetail };
