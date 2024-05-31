"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Course_mimber extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Course_mimber.hasOne(models.Course, {
        foreignKey: "id",
      });
      Course_mimber.hasMany(models.User, {
        foreignKey: "id",
      });
    }
  }
  Course_mimber.init(
    {
      courseId: DataTypes.STRING,
      userid: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Course_mimber",
    }
  );
  return Course_mimber;
};
