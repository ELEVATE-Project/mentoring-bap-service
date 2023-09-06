'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemAttendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ItemAttendance.init({
    userMongoId: DataTypes.UUID,
    itemMongoId: DataTypes.UUID,
    orderId: DataTypes.STRING,
    status: DataTypes.STRING,
    type: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    joinLink: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ItemAttendance',
    tableName: 'ItemAttendances'
  });
  return ItemAttendance;
};