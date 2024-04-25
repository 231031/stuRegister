import { DataTypes } from "sequelize";
import { sequelize } from "../dbcon.js";
import { Projectstu } from "./Projectstu.model.js";
import { Projectteacher } from "./Projectteacher.model.js";

const Project = sequelize.define('Project',{
    project_id : {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    projectName : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    field : {
        type: DataTypes.STRING,
        allowNull: false,
    },
},{
    tableName: 'Project', // Define the table name
    timestamps: false, // Exclude createdAt and updatedAt fields
    underscored: true,
});

Project.hasMany(Projectstu, { foreignKey: 'project_id', onUpdate: 'cascade' });
// Projectstu.belongsTo(Project, { foreignKey: 'project_id', onUpdate: 'cascade' });

Project.hasMany(Projectteacher, { foreignKey: 'project_id', onUpdate: 'cascade' });
// Projectteacher.belongsTo(Project, { foreignKey: 'project_id', onUpdate: 'cascade' });
export { Project };