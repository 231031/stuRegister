import { DataTypes } from "sequelize";
import { sequelize } from "../dbcon.js";
import { Arractivity } from "./Arractivity.model.js";

const Activity = sequelize.define('Activity',{
    activity_id : {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    activityName : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    hours : {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    date :{
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    status :{
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
},{
    tableName: 'Activity',
    timestamps: false, 
    updatedAt: false, 
    underscored: true,
});

Activity.hasMany(Arractivity, {foreignKey: 'activity_id', onUpdate: 'cascade', onDelete: 'restrict' });
Arractivity.belongsTo(Activity, {foreignKey: 'activity_id', onUpdate: 'cascade', onDelete: 'restrict' });

export { Activity };

