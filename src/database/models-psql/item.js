'use strict'
const { DataTypes, Model } = require('sequelize')
const postgresdb = require('@configs/postgres')

class Item extends Model {}

Item.init({
    itemId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    details: {
        type: DataTypes.STRING,
    },
    bppMongoId: {
        type: DataTypes.UUID,
        references: {
            model: 'bpp', // name of your model, typically the table name in Postgres
            key: 'id',
        },
    },
}, {
    sequelize: postgresdb,
    modelName: 'Item',
    underscored: true,
    timestamps: true
})

module.exports = Item
