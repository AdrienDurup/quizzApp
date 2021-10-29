import { sequelize } from "../database";
import { DataTypes, Model } from "sequelize";

export class Level extends Model {}

Level.init(
	{
		name: DataTypes.TEXT,
	},
	{
		sequelize,
		tableName: "level",
	}
);
