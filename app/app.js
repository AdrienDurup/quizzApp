import express from "express";
import ejs from "ejs";
import session from "express-session";
import config from "./config";
import { router } from "./router";

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(
	session({
		secret: config.secret,
		resave: true,
		saveUninitialized: true,
		cookie: {
			secure: false,
			maxAge: 1000 * 60 * 60,
		},
	})
);

app.use(router);
app.set("views", "./app/views");
app.set("view engine", "ejs");

app.listen(config.port, async () => {
	console.log(`Server is running on http://${config.host}:${config.port}`);
});
