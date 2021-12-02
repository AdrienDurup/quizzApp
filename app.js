const express= require("express");
const session= require("express-session");
const router= require("./app/router");
require("dotenv").config();

const app = express();
app.use(express.urlencoded({ extended: true }));

const port=process.env.PORT;
const host=process.env.HOST;

app.use(
	session({
		secret: process.env.SECRET,
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

app.listen(port, () => {
	console.log(`Server is running on http://${host}:${port}`);
});
