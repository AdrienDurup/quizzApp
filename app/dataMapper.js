import databaseConnect from "./database";

export const dataMapper = {
	dbQuery(query) {
		const client = databaseConnect();
		return client
			.query(query)
			.then((res) => res.rows)
			.catch((err) => {
				if (err.code === "42P01") {
					console.log(`Query error, undefined table!, ${err}`);
				} else {
					console.log(error.message);
				}
			})
			.finally(() => {
				client.end();
			});
	},
	async getCategories(param) {
		return await dataMapper.dbQuery("");
	},
};
