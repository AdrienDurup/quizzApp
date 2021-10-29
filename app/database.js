import config from "./config";

const { Sequelize } = require("sequelize");

export const sequelize = new Sequelize(
	config.db,
	config.db_user,
	config.db_pwd,
	{
		host: config.db_host,
		port: config.db_port,
		define: {
			timestamps: false,
			underscored: true,
		},
		dialect: "postgres",
		logging: false
	}
);
