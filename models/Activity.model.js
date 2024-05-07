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
    dateAc :{
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    acDay :{ // number of days in the activity
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    finite : {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    count : {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    }
},{
    tableName: 'Activity',
    timestamps: false, 
    updatedAt: false, 
    underscored: true,
});

Activity.hasMany(Arractivity, {foreignKey: 'activity_id', onUpdate: 'cascade', onDelete: 'restrict' });
Arractivity.belongsTo(Activity, {foreignKey: 'activity_id', onUpdate: 'cascade', onDelete: 'restrict' });

export { Activity };

