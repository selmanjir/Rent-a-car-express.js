'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('spareParts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      partName: {
        type: Sequelize.STRING
      },
      unitPrice: {
        type: Sequelize.STRING
      },
      unitInStock: {
        type: Sequelize.INTEGER
      },
      isDeleted: {
        type: Sequelize.BOOLEAN
      },
      isActive: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('spareParts');
  }
};