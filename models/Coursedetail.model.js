import { DataTypes } from "sequelize";
import { sequelize } from "../dbcon.js";
// import { Course } from "./Course.model.js";

const Coursedetail = sequelize.define('Coursedetail',{
    course_id : {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    group : {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
},{
    tableName: 'course_detail', // Define the table name
    timestamps: false, // Exclude createdAt and updatedAt fields
    underscored: true,
})

// Coursedetail.belongsTo(Course)
export { Coursedetail };
