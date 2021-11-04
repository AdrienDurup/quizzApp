const express= require("express");
// import session from "express-session";
const adminController = require( "./controllers/adminController");
const mainController = require( "./controllers/mainController");
const sessionController = require("./controllers/sessionController");

const router=express.Router();

router.use(express.static("./app/public"));

router.use("/favicon.ico", function (req, res) {
	res.status(204);
	res.end();
});

router.use(sessionController.sessionControl);
router.get("/",mainController.root);
router.get("/signup",mainController.signMeUp);
router.get('/login',mainController.logMeUp);
router.get("/quizz/:id",mainController.quizzPage);
router.get("/tags",mainController.tagsPage);
router.get("/tag/:tag",mainController.tagContentPage);
router.post("/signup",sessionController.signUp);
router.post("/login",sessionController.logIn);
router.get("/logout",sessionController.logOut);
router.get("/admin",adminController.accessControl,adminController.adminRoot);


module.exports= router;