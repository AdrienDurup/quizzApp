import { sequelize } from "../database";
import { DataTypes, Model } from "sequelize";

export class Question extends Model {}

Question.init(
	{
		question: DataTypes.TEXT,
		anecdote: DataTypes.TEXT,
		wiki: DataTypes.TEXT,
	},
	{
		sequelize,
		tableName: "question",
	}
);
