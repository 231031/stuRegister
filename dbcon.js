import { Sequelize } from "sequelize";
import mysql from 'mysql2/promise';
import ENV from './fig.js';

export const sequelize = new Sequelize(ENV.DB, ENV.USER, ENV.PASS, {
    host: ENV.HOST,
    dialect: "mysql",
});

const pool = mysql.createPool({
  host: ENV.HOST,
  user: ENV.USER,
  database: ENV.DB,
  port: 3306,
  password: ENV.PASS,
});
export default pool;
