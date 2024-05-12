import mysql from 'mysql2/promise';
import ENV from './fig.js';

const pool = mysql.createPool({
  host: ENV.HOST,
  user: ENV.USER,
  database: ENV.DB,
  port: 3306,
  password: ENV.PASS,
  keepAliveInitialDelay: 10000, // 0 by default.
  enableKeepAlive: true, // false by default.
});
export default pool;
