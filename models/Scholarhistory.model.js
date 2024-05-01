import { DataTypes } from "sequelize";
import { sequelize } from "../dbcon.js";

const Scholarhistory = sequelize.define('Scholarhistory',{
    scholarship_id : {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    student_id : {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    getYear : {
        type: DataTypes.DATE,
        allowNull: false,
        primaryKey: true,
    },
    status : {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    approve : {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    }
},{
    tableName: 'scholar_history',
    timestamps: false, 
    updatedAt: false,
    underscored: true,
});

export { Scholarhistory };