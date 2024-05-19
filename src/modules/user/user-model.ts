import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/db";
import { logger } from "../../logger/logger";

class User extends Model {
  declare id:number;
  declare email: string;
  declare password: string;
  declare verification_code: string;
  declare is_verified: boolean;
  declare jwt_token: string;
  declare socket_id: string;
  declare active: boolean;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  verification_code: {
    type: DataTypes.STRING,
  },
  is_verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  jwt_token: {
    type: DataTypes.STRING,
  },
  socket_id: {
    type: DataTypes.STRING,
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
}, { sequelize, tableName: "users" });

const sequelizePaginate = require('sequelize-paginate');
sequelizePaginate.paginate(User);

User.sync().then(() => {
    logger.warn("User table Sync Successfully");
})

export default User