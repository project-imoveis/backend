"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Usuarios",
      [
        {
          name: "Joao Goulard",
          password: "Joao123",
          email: "Joao@gmail.com",
          tel: "21987654321",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Pedro Superti",
          password: "Pedro123",
          email: "erico@gmail.com",
          tel: "21987654321",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Erico Rocha",
          password: "Erico123",
          email: "erico@gmail.com",
          tel: "21987654321",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Camila Farani",
          password: "Camila123",
          email: "camila@gmail.com",
          tel: "21987654321",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          name: "Caito Maia",
          password: "Caito123",
          email: "caito@gmail.com",
          tel: "21987654321",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Usuarios", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
  },
};
