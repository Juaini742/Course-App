"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Course.belongsTo(models.Course_mimber, {
        foreignKey: "id",
      });
    }
  }
  Course.init(
    {
      title: DataTypes.STRING,
      name: DataTypes.STRING,
      rate: DataTypes.INTEGER,
      mimber: DataTypes.INTEGER,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Course",
    }
  );
  return Course;
};
