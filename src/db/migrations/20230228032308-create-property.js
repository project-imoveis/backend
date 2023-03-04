"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Properties", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: Sequelize.STRING,
      },
      value: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      iptu: {
        type: Sequelize.INTEGER,
      },
      useful_area: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      total_area: {
        type: Sequelize.INTEGER,
      },
      post_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      usage_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      unit_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      subUnit_type: {
        type: Sequelize.STRING,
        allowNull: false,
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
    await queryInterface.dropTable("Properties");
  },
};
