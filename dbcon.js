import { Sequelize } from "sequelize";
import ENV from './fig.js';

// export const sequelize = new Sequelize(ENV.DB, ENV.USER, ENV.PASS, {
//     host: ENV.HOST,
//     dialect: "mysql",
//   });

export const sequelize = new Sequelize("test", ENV.USER, "", {
    host: "localhost",
    dialect: "mysql",
  });
