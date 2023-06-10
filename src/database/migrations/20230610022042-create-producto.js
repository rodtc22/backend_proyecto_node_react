'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Productos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        allowNull: false,
        type: Sequelize.STRING(250)
      },
      precio: {
        type: Sequelize.DECIMAL(10,2)
      },
      stock: {
        type: Sequelize.INTEGER
      },
      imagen: {
        type: Sequelize.STRING(255)
      },
      descripcion: {
        type: Sequelize.TEXT
      },
      estado: {
        defaultValue: true,
        type: Sequelize.BOOLEAN
      },
      categoriaId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Categoria',
          key: 'id'
        }
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
    await queryInterface.dropTable('Productos');
  }
};