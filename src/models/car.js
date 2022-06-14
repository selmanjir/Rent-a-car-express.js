'use strict';
const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/db');

  class Car extends Model {}
  Car.init({
    brand: DataTypes.STRING,
    model: DataTypes.STRING,
    salePrice: DataTypes.INTEGER,
    isDeleted: DataTypes.BOOLEAN,
    isActive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'car'
  });


module.exports = Car;
