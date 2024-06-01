"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Nims", [
      {
        id: crypto.randomUUID(),
        userId: null,
        nim: "12345",
        createdAt: new Date(),
        UpdatedAt: new Date(),
      },
      {
        id: crypto.randomUUID(),
        userId: null,
        nim: "23456",
        createdAt: new Date(),
        UpdatedAt: new Date(),
      },
      {
        id: crypto.randomUUID(),
        userId: null,
        nim: "34567",
        createdAt: new Date(),
        UpdatedAt: new Date(),
      },
      {
        id: crypto.randomUUID(),
        userId: null,
        nim: "45678",
        createdAt: new Date(),
        UpdatedAt: new Date(),
      },
      {
        id: crypto.randomUUID(),
        userId: null,
        nim: "56789",
        createdAt: new Date(),
        UpdatedAt: new Date(),
      },
      {
        id: crypto.randomUUID(),
        userId: null,
        nim: "67890",
        createdAt: new Date(),
        UpdatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Nims", null, {});
  },
};
