const devConfig = {
	host: process.env.HOST || "localhost",
	port: process.env.PORT || 5000,
	db_user: process.env.DB_USER,
	db_pwd: process.env.DB_PWD,
	db_host: process.env.DB_HOST,
	db: process.env.DB,
	db_port: process.env.DB_PORT,
	secret: process.env.SECRET,
	pwd_saltrounds: process.env.PWD_SALTROUNDS
}
module.exports = devConfig
