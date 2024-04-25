import { DataTypes } from "sequelize";
import { sequelize } from "../dbcon.js";

const Projectteacher = sequelize.define('Projectteacher',{
    project_id : {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    teacher_id : {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    }
},{
    tableName: 'project_teacher', // Define the table name
    timestamps: false, // Exclude createdAt and updatedAt fields
    underscored: true,
});



export { Projectteacher };