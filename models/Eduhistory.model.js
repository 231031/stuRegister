import { DataTypes } from "sequelize";
import { sequelize } from "../dbcon.js";
const Eduhistory = sequelize.define('Eduhistory',{
    student_id : {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    finishedYear : {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    schoolName : {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    grade : {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    level : {
        type: DataTypes.STRING,
        allowNull: false,
    }
    
},{
    tableName: 'edu_history', // Define the table name
    timestamps: false, // Exclude createdAt and updatedAt fields
    underscored: true,
}
)
export { Eduhistory };