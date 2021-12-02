const sequelize =require("../database");
const { DataTypes, Model } =require("sequelize");

class Quizz extends Model {}

Quizz.init(
	{
		title: DataTypes.TEXT,
		description: DataTypes.TEXT,
	},
	{
		sequelize,
		tableName: "quizz",
	}
);
module.exports=Quizz;