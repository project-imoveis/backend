"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Imoveis",
      [
        {
          titulo: "Sobrado no Guará",
          valor: 300000,
          area_util: 160,
          id_usuario: 1,
          tipo_de_anuncio: "venda",
          tipo_de_uso: "residencial",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          titulo: "Apartamento no Park Sul",
          valor: 2600,
          area_util: 70,
          id_usuario: 2,
          tipo_de_anuncio: "aluguel",
          tipo_de_uso: "residencial",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          titulo: "Loft no Sudoeste",
          valor: 2000,
          area_util: 40,
          id_usuario: 3,
          tipo_de_anuncio: "aluguel",
          tipo_de_uso: "residencial",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          titulo: "Sala Comercial no Centro",
          valor: 4000,
          area_util: 110,
          id_usuario: 4,
          tipo_de_anuncio: "aluguel",
          tipo_de_uso: "comercial",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("People", null, {});
  },
};
