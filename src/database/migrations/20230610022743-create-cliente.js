'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Clientes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre_completo: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      nit: {
        type: Sequelize.STRING
      },
      correo: {
        type: Sequelize.STRING(200)
      },
      ci_nit: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.STRING(15)
      },
      telefono: {
        type: Sequelize.STRING(15)
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
    await queryInterface.dropTable('Clientes');
  }
};