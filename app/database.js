const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
	process.env.DB,
	process.env.DB_USER,
	process.env.DB_PWD,
	{
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		define: {
			timestamps: false,
			underscored: true,
		},
		dialect: "postgres",
		logging: false
	}
);
module.exports=sequelize;