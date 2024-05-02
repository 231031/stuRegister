import { Sequelize } from "sequelize";
import ENV from './fig.js';

export const sequelize = new Sequelize(ENV.DB, ENV.USER, ENV.PASS, {
    host: ENV.HOST,
    dialect: "mysql",
  });

// export const sequelize = new Sequelize("stu_regis", "root", "", {
//     host: "localhost",
//     dialect: "mysql",
//   });
