'use strict';
const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/db');

  class SparePart extends Model {}
  SparePart.init({
    partName: DataTypes.STRING,
    unitPrice: DataTypes.STRING,
    unitInStock: DataTypes.INTEGER,
    isDeleted: DataTypes.BOOLEAN,
    isActive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'sparePart'
  });


module.exports = SparePart;
