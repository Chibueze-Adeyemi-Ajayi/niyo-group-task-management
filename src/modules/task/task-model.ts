import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/db";
import { logger } from "../../logger/logger";
import User from "../user/user-model";

// slug:string, title:string, time:string, date:any, content:string
class Task extends Model {
  declare id:number;
  declare slug:string;
  declare title:string;
  declare time:any;
  declare date:Date;
  declare content:string;
}

Task.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  UserId: {
    type: DataTypes.INTEGER,
  }
}, { sequelize, tableName: "tasks" });

const sequelizePaginate = require('sequelize-paginate');
sequelizePaginate.paginate(Task);

Task.sync().then(() => {
    logger.warn("Task table Sync Successfully");
})

User.hasMany(Task);
Task.belongsTo(User);

export default Task