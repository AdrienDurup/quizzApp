import bcrypt from "bcrypt";
import config from "../config";
import { index } from "../models"
import { User } from "../models/user";


const sessionController = {

    //     logIn: (req, res) => {
    //         const login = req.query.id;
    //         const passwordHash = req.query.password;
    //         const User=new User({
    // login,
    // password:passwordHash
    //         });

    //     },

    // sessionControl: async (req, res, next) => {
    //     try {
    //         if (req.body.password) {
    //             // res.locals.passwordHash= await bcrypt.hash(req.body.password, Number(config.pwd_saltrounds))

    //             next();
    //         }
    //     } catch (err) {
    //         console.error(err);
    //     };

    // },

    signUp: async (req, res) => {
        const email = req.body.email;
        const firstname = req.body.firstname === '' ? null : req.body.firstname;
        const lastname = req.body.lastname === '' ? null : req.body.lastname;
        let password
        if (req.body.password) {
            password = await bcrypt.hash(req.body.password, Number(config.pwd_saltrounds));
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
        if (result[0]&&req.body.password) {
                isValid = await bcrypt.compare(req.body.password, result[0].password);
        };
        if (isValid) {
            user = result[0];
            req.session.login = user;
            console.log("Bien connecté");
            res.redirect("/");
        } else {
            console.log('Non trouvé');
            res.redirect("/signup");
        };
    }
}

module.exports = { sessionController }