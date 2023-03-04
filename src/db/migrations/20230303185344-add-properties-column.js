"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Properties", "unit_type", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("Properties", "subunit_type", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Properties", "unit_type");
    await queryInterface.removeColumn("Properties", "subunit_type");
  },
};
