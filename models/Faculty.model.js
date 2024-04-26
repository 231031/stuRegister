import { DataTypes } from "sequelize";
import { sequelize } from "../dbcon.js";
import { Department } from "./Department.model.js";
const Faculty = sequelize.define('Faculty',{
    faculty_id : {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    facultyName : {
        type: DataTypes.STRING,
        allowNull: false,
    },
},{
    tableName: 'Faculty', 
    timestamps: false, 
    updatedAt: false, 
    underscored: true,
});

Faculty.hasMany(Department, { foreignKey: 'faculty_id', onUpdate: 'cascade', onDelete: 'restrict' });
Department.belongsTo(Faculty, { foreignKey: 'faculty_id', onUpdate: 'cascade', onDelete: 'restrict' });

export { Faculty };

