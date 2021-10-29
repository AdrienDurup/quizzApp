import { sequelize } from "../database";
import { DataTypes, Model } from "sequelize";

export class Answer extends Model {}

Answer.init(
	{
		description: DataTypes.TEXT,
	},
	{
		sequelize,
		tableName: "answer",
	}
);
