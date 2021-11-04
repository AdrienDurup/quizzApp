import bcrypt from "bcrypt";
import { index } from "../models"
import { User } from "../models/user";
require("dotenv").config();

const saltRounds = process.env.PWD_SALTROUNDS;

const sessionController = {
    sessionControl: (req, res, next) => {
        if (!req.session.user) { // on n'a pas encore de propriété user dans la session
            req.session.user = false;
        };
        res.locals.user = req.session.user;
        // console.log("sessionControl",res.locals.user);
        next();
    },
    signUp: async (req, res) => {
        const email = req.body.email;
        const firstname = req.body.firstname === '' ? null : req.body.firstname;
        const lastname = req.body.lastname === '' ? null : req.body.lastname;
        let password;
        if (req.body.password) {
            password = await bcrypt.hash(req.body.password, Number(saltRounds));
        };
        try {
            const user = await new index.User({
                firstname,
                lastname,
                email,
                password
            })
                .save();
        } catch (err) {
            console.error(err);
        }
        res.redirect("/");
    },

    logIn: async (req, res) => {
        try {
            let user = new User({
                email: req.body.email,
                password: req.body.password,
            });
            let result = await User.findAll({
                where: {
                    email: user.email
                }
            });
            let isValid;
            if (result[0] && req.body.password) {
                isValid = await bcrypt.compare(req.body.password, result[0].password);
            };
            if (isValid) {
                user = result[0];
                req.session.user = user;
                res.locals.user = user;
                console.log(res.locals.user);
                console.log("Bien connecté");
                res.redirect("/");
            } else {
                console.log('Non trouvé');
                res.redirect("/signup");
            };
        } catch (err) {
            console.error(err);
        };
    },
    logOut: async (req, res) => {
        try {
            // console.log("LOGIN 1 ?",req.session.login);
            req.session.user=false;
            res.locals.user=false;
            res.redirect("/");

        } catch (err) {
            console.error(err);
            res.status(500).redirect("/");
        };
    },

}

module.exports = {sessionController};