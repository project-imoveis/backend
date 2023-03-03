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
          telefone: "21987654321",
          user_type: "corretor",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Pedro Superti",
          password: "Pedro123",
          email: "pedrosuperti@gmail.com",
          telefone: "21987654321",
          user_type: "corretor",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Erico Rocha",
          password: "Erico123",
          email: "ericorocha@gmail.com",
          telefone: "21987654321",
          user_type: "imobiliaria",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Camila Farani",
          password: "Camila123",
          email: "camilafarani@gmail.com",
          telefone: "21987654321",
          user_type: "pessoaFisica",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          name: "Caito Maia",
          password: "Caito123",
          email: "caitomaia@gmail.com",
          telefone: "21987654321",
          user_type: "pessoaJuridica",
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
