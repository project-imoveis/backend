"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Imoveis", "titulo", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
    /**
     * Add altering commands here.
     *
     * Example:
     */
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
