require('dotenv').config()
module.exports = {
	development: {
		url: process.env.DEV_DATABASE_URL,
		dialect: 'postgres',
		migrationStorageTableName: 'sequelize_meta',
		define: {
			underscored: true,
			freezeTableName: true,
			paranoid: true,
			syncOnAssociation: true,
			charset: 'utf8',
			collate: 'utf8_general_ci',
			//classMethods: { method1: function () {} },
			//instanceMethods: { method2: function () {} },
			timestamps: true,
			//schema: 'prefix',
		},
	},
	test: {
		url: process.env.TEST_DATABASE_URL,
		dialect: 'postgres',
	},
	production: {
		url: process.env.DATABASE_URL,
		dialect: 'postgres',
	},
}