// import { DataTypes } from "sequelize";
// import { sequelize } from "../dbcon.js";
// import { Scholarhistory } from "./Scholarhistory.model.js";

// const Scholarship = sequelize.define('Scholarship',{
//     scholarship_id : {
//         type: DataTypes.STRING,
//         allowNull: false,
//         primaryKey: true,
//     },
//     scholarshipName : {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     finite : {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         defaultValue: 15,
//     },
//     count : {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         defaultValue: 0,
//     },
//     lowGrade : {
//         type: DataTypes.FLOAT,
//         allowNull: false,
//         defaultValue: 3,
//     },
//     start: {
//         type: DataTypes.DATEONLY,
//         allowNull: false,
//     },
//     end : {
//         type: DataTypes.DATEONLY,
//         allowNull: false,
//     }
// },{
//     tableName: 'Scholarship',
//     timestamps: false, 
//     updatedAt: false,
//     underscored: true,
// });

// Scholarship.hasMany(Scholarhistory, { foreignKey: 'scholarship_id', onUpdate: 'cascade' });
// Scholarhistory.belongsTo(Scholarship, { foreignKey: 'scholarship_id', onUpdate: 'cascade' });

// export { Scholarship };