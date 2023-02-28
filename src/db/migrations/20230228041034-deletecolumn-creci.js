"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Usuarios", "creci");
    /**
     * Add altering commands here.
     *
     * Example:
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("Usuarios", "creci", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    /**
     * Add reverting commands here.
     *
     * Example:
     */
  },
};
