const sequelize =require("../database");
const { DataTypes, Model } =require("sequelize");

class Level extends Model {}

Level.init(
	{
		name: DataTypes.TEXT,
	},
	{
		sequelize,
		tableName: "level",
	}
);
module.exports=Level;