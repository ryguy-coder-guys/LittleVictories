"use strict";
exports.__esModule = true;
exports.dbConnection = void 0;
var sequelize_1 = require("sequelize");
var DB_NAME = 'LittleVictories';
var DB_USER = 'root';
var DB_PASSWORD = '';
exports.dbConnection = new sequelize_1.Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    dialect: 'mysql'
});
