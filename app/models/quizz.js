import { sequelize } from "../database";
import { DataTypes, Model } from "sequelize";

export class Quizz extends Model {}

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
