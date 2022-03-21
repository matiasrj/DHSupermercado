'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('order_detail', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      
      idOrder: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model: 'order',
          key: "id"
        },
        onDelete: 'CASCADE',
        onUpdate: "CASCADE"
      },
      idProduct: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model: 'product',
          key: "id"
        },
        onDelete: 'CASCADE',
        onUpdate: "CASCADE"
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('order_detail');
  }
};