'use strict';
const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/db');

  class Accessory extends Model {}
    Accessory.init({
    partName: DataTypes.STRING,
    unitPrice: DataTypes.STRING,
    unitInStock: DataTypes.INTEGER,
    isDeleted: DataTypes.BOOLEAN,
    isActive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'accessory'
  });


module.exports = Accessory;
