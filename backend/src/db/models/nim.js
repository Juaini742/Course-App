'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Nim extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Nim.init({
    userId: DataTypes.STRING,
    nim: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Nim',
  });
  return Nim;
};