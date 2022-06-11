'use strict';
const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/db');

  class Motorcycle extends Model {}
  Motorcycle.init({
    brand: DataTypes.STRING,
    model: DataTypes.STRING,
    salePrice: DataTypes.INTEGER,
    isDeleted: DataTypes.BOOLEAN,
    isActive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'motorcycle'
  });


module.exports = Motorcycle;
