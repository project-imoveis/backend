"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Properties",
      [
        {
          title: "Sobrado no Guará",
          value: 300000,
          useful_area: 160,
          user_id: 1,
          post_type: "venda",
          usage_type: "residencial",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Apartamento no Park Sul",
          value: 2600,
          useful_area: 70,
          user_id: 2,
          post_type: "aluguel",
          usage_type: "residencial",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Loft no Sudoeste",
          value: 2000,
          useful_area: 40,
          user_id: 3,
          post_type: "aluguel",
          usage_type: "residencial",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Sala Comercial no Centro",
          value: 4000,
          useful_area: 110,
          user_id: 4,
          post_type: "aluguel",
          usage_type: "comercial",
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
