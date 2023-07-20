'use strict'
const { DataTypes, Model } = require('sequelize')
const postgresdb = require('@configs/postgres')

class Bpp extends Model {}

Bpp.init({
    bppId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bppUri: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize: postgresdb,
    modelName: 'Bpp',
    underscored: true,
    timestamps: true
})

module.exports = Bpp
