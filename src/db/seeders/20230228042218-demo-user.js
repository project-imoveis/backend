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
          tipo_de_usuario: "corretor",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Pedro Superti",
          password: "Pedro123",
          email: "pedrosuperti@gmail.com",
          tel: "21987654321",
          tipo_de_usuario: "corretor",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Erico Rocha",
          password: "Erico123",
          email: "ericorocha@gmail.com",
          tel: "21987654321",
          tipo_de_usuario: "imobiliaria",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Camila Farani",
          password: "Camila123",
          email: "camilafarani@gmail.com",
          tel: "21987654321",
          tipo_de_usuario: "pessoaFisica",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          name: "Caito Maia",
          password: "Caito123",
          email: "caitomaia@gmail.com",
          tel: "21987654321",
          tipo_de_usuario: "pessoaJuridica",
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
