import { databaseConnect } from "../database";

const client = databaseConnect();
export class CoreModel {
	#id;
	constructor(obj) {
		this.#id = obj.id;
	}

	get id() {
		return this.#id;
	}
	set id(value) {
		if (typeof value !== "number") {
			console.log("L'id doit être un number !");
		} else {
			this.#id = value;
		}
	}

	static async findAll() {
		return await client
			.query(`SELECT * FROM "${this.name.toLowerCase()}"`)
			.then((res) => res.rows)
			.catch((err) => {
				if (err.code === "42P01") {
					console.log(`Query error, undefined table!, ${err}`);
				} else {
					console.log(err.message);
				}
			});
	}

	async findOne() {
		return await client
			.query(
				`SELECT * FROM "${this.constructor.name.toLowerCase()}" WHERE id = ${
					this.id
				}`
			)
			.then((res) => res.rows)
			.catch((err) => {
				if (err.code === "42P01") {
					console.log(`Query error, undefined table!, ${err}`);
				} else {
					console.log(err.message);
				}
			});
	}

	async insert() {
		const fieldNames = [];
		const fieldValues = [];
		const fieldPositions = [];
		let count = 1;
		for (const element in this) {
			fieldNames.push(`"${element}"`);
			fieldValues.push(this[element]);
			fieldPositions.push(`$${count}`);
			count++;
		}
		await client
			.query(
				`INSERT INTO "${this.constructor.name.toLowerCase()}"(${fieldNames.join(
					", "
				)}) VALUES(${fieldPositions.join(", ")}) RETURNING id`,
				fieldValues
			)
			.catch((err) => console.log(err.message));
	}
	async update() {
		const fieldUpdates = [];
		const values = [];
		let count = 1;
		for (const element in this) {
			values.push(this[element]);
			fieldUpdates.push(`"${element}"=$${count}`);
			count++;
		}
		values.push(this.id);
		await client
			.query(
				`UPDATE "${this.constructor.name.toLowerCase()}" SET ${fieldUpdates.join(
					", "
				)} WHERE id=$${count}`,
				values
			)
			.catch((err) => console.log(err.message));
	}
	async delete() {
		await client
			.query(
				`DELETE FROM "${this.constructor.name.toLowerCase()}" WHERE id = ${
					this.id
				}`
			)
			.catch((err) => console.log(err.message));
	}

	static async findBy(param) {
		let fieldToSearch = [];
		let values = [];
		for (const [index, [key]] of Object.entries(Object.entries(param))) {
			if (key === "id") {
				fieldToSearch.push(`AND "${key}" = $${Number(index) + 1}`);
				values.push(param[key]);
			} else {
				fieldToSearch.push(`AND "${key}" ILIKE $${Number(index) + 1}`);
				values.push(param[key]);
			}
		}
		fieldToSearch[0] = fieldToSearch[0].replace("AND ", "");
		let result = await client.query(
			`SELECT * FROM "${this.name.toLowerCase()}" WHERE ${fieldToSearch.join(
				" "
			)}`,
			values
		);
		return result.rows;
	}

	async save() {
		let checkDb = await this.constructor.findBy(this);
		!checkDb.length ? this.insert() : this.update();
	}
}
