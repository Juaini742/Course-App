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
    await queryInterface.bulkInsert("Courses", [
      {
        id: crypto.randomUUID(),
        title: "Introduction to Programming with Python",
        name: "Annisa Salsabila",
        description:
          "This course is designed to introduce you to the Python programming language. You will learn about basic Python syntax, control structures, and functions.",

        rate: 0,
        mimber: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: crypto.randomUUID(),
        title: "Web Programming with JavaScript",
        name: "Annisa Salsabila",
        description:
          "This course will teach you how to use JavaScript to create interactive and dynamic websites. You will learn about the DOM, event handling, and AJAX.",

        rate: 0,
        mimber: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: crypto.randomUUID(),
        title: "Data Analysis with Excel",
        name: "Annisa Salsabila",
        description:
          "Master the essential tools in Excel to clean, analyze, and visualize your data. Learn about pivot tables, formulas, and data charts.",

        rate: 0,
        mimber: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: crypto.randomUUID(),
        title: "Web Design Fundamentals",
        name: "Annisa Salsabila",
        description:
          "Gain a solid foundation in web design principles like HTML, CSS, and user interface (UI) design. This course will equip you to create visually appealing and user-friendly websites.",

        rate: 0,
        mimber: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: crypto.randomUUID(),
        title: "Digital Marketing Strategies",
        name: "Annisa Salsabila",
        description:
          "Explore various digital marketing channels like social media marketing, search engine optimization (SEO), and email marketing. Learn how to reach your target audience effectively.",

        rate: 0,
        mimber: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: crypto.randomUUID(),
        title: "Content Creation for Social Media",
        name: "Annisa Salsabila",
        description:
          "Unleash your creativity and learn how to create compelling content for social media platforms like Instagram, Facebook, and Twitter. This course will cover content strategy, copywriting, and visual design.",

        rate: 0,
        mimber: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: crypto.randomUUID(),
        title: "Introduction to Cybersecurity",
        name: "Annisa Salsabila",
        description:
          "In today's digital world, cybersecurity is crucial. This course will introduce you to cybersecurity concepts, threats, and best practices to protect your data and online presence.",

        rate: 0,
        mimber: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: crypto.randomUUID(),
        title: "Project Management Fundamentals",
        name: "Annisa Salsabila",
        description:
          "Learn effective project management techniques to organize your workflow, manage resources, and deliver projects on time and within budget.",

        rate: 0,
        mimber: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: crypto.randomUUID(),
        title: "Public Speaking and Communication Skills",
        name: "Annisa Salsabila",
        description:
          "Enhance your public speaking and communication skills to deliver impactful presentations and express yourself clearly in any situation.",

        rate: 0,
        mimber: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: crypto.randomUUID(),
        title: "Introduction to Cloud Computing",
        name: "Annisa Salsabila",
        description:
          "Demystify cloud computing concepts like SaaS, PaaS, and IaaS. This course will explore the benefits of cloud computing and its applications in various industries.",

        rate: 0,
        mimber: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
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
    await queryInterface.bulkDelete("Courses", null, {});
  },
};
