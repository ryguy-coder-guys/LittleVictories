import sequelize from 'sequelize';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import path from 'path';

const DB_NAME = 'little_victories';
const DB_USER = 'root';
// const DB_PASSWORD = process.env.DATABASE_PASSWORD;
const DB_PASSWORD = '';

export const dbConnection = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  dialect: 'mysql',
});

dbConnection
  .authenticate()
  .then(() => console.log('little victories database connection successful'))
  .catch((err) => {
    console.log('little victories database connection unsuccessful');
    console.log(err);
  });
