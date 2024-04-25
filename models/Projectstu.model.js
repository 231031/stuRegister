import { DataTypes } from "sequelize";
import { sequelize } from "../dbcon.js";

const Projectstu = sequelize.define('Projectstu',{
    project_id : {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    student_id : {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    }
},{
    tableName: 'project_stu', // Define the table name
    timestamps: false, // Exclude createdAt and updatedAt fields
    underscored: true,
});



export { Projectstu };