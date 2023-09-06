'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Bpp extends Model {
    static associate(models) {
      // Define associations here (if needed)
    }
  }

  Bpp.init(
    {
      id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
      bppId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      bppUri: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Bpp',
      tableName: 'bpps',
    }
  );

  return Bpp;
};
