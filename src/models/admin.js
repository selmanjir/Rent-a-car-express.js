'use strict';
const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/db');

  class Admin extends Model {}
  Admin.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'admin'
  });


module.exports = Admin;
