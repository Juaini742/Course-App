"use strict";
const crypto = require("crypto");

function generateNextNIM(lastNIM) {
  let nextNumber = parseInt(lastNIM) + 1;
  return nextNumber.toString();
}

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

    let lastNIM = "123456";
    const nimsToInsert = [];
    for (let i = 0; i < 100; i++) {
      lastNIM = generateNextNIM(lastNIM);
      nimsToInsert.push({
        id: crypto.randomUUID(),
        userId: null,
        nim: lastNIM,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }


    await queryInterface.bulkInsert("Nims", nimsToInsert);
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
