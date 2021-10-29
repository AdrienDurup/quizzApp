import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";

export class User extends Model {
    get fullname() {
        return `${this.firstname} ${this.lastname}`;
    }
}

User.init(
	{
		email: {
			type: DataTypes.TEXT,
			validate: {
				isEmail: true,
			},
		},
		password: DataTypes.TEXT,
		firstname: DataTypes.TEXT,
		lastname: DataTypes.TEXT,
	},
	{
		sequelize,
		tableName: "user",
	}
);
