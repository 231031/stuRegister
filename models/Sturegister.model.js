import { DataTypes } from "sequelize";
import { sequelize } from "../dbcon.js";

const Sturegister = sequelize.define('Sturegister',{
    student_id : {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    course_id : {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    year : {
        type: DataTypes.DATE,
        allowNull: false,
        primaryKey: true,
    },
    term : {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    grade : {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    group : {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    
},{
    tableName: 'stu_register', // Define the table name
    modelName: 'Sturegister',
    timestamps: false, // Exclude createdAt and updatedAt fields
    underscored: true,
});




export { Sturegister };