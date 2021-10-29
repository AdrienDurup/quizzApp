import { sequelize } from "../database";
import { DataTypes, Model } from "sequelize";

export class Tag extends Model {}

Tag.init(
	{
		name: DataTypes.TEXT,
	},
	{
		sequelize,
		tableName: "tag",
	}
);
