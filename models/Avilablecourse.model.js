import { DataTypes } from "sequelize";
import { sequelize } from "../dbcon.js";


const Availablecourse = sequelize.define('Availablecourse',{
    department_id : {
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
        type: DataTypes.INTEGER,
        allowNull: false,
    }
},{
    tableName: 'available_course',
    timestamps: false, 
    updatedAt: false, 
    underscored: true,
});

export { Availablecourse };

