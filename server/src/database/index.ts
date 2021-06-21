import { Sequelize } from 'sequelize';

const DB_NAME = 'LittleVictories';
const DB_USER = 'root';
const DB_PASSWORD = '';

export const dbConnection = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  dialect: 'mysql',
});
