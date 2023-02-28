"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Imoveis", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      titulo: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      descricao: {
        type: Sequelize.STRING,
      },
      valor: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      iptu: {
        type: Sequelize.INTEGER,
      },
      area_util: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      area_total: {
        type: Sequelize.INTEGER,
      },
      tipo_de_anuncio: {
        type: Sequelize.STRING,
      },
      tipo_de_uso: {
        type: Sequelize.STRING,
      },
      id_usuario: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Usuarios",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Imoveis");
  },
};
