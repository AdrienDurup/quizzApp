const bcrypt = require('bcrypt');
const { User } = require("../models");

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
        try {
            const email = req.body.email;
            const firstname = req.body.firstname === '' ? null : req.body.firstname;
            const lastname = req.body.lastname === '' ? null : req.body.lastname;
            let password;
            if (req.body.password) {
                password = await bcrypt.hash(req.body.password, Number(saltRounds));
            };
            const userCheck = await User.findOne({
                where: {
                    email: email
                }
            });

            console.log("userCheck", userCheck);

            if (userCheck) {
                // il ya déjà un user avec cet email en BDD, on envoie une erreur
                return res.render('signup', { error: 'Un utilisateur avec cet email existe déjà.' });
            };

            if (req.body.password !== req.body.passwordConfirm) {
                //le password et la vérif ne matchent pas, on envoie une erreur
                return res.render('signup', { error: 'La confirmation du mot de passe est incorrecte.' });
            };

            const user = await new User({
                firstname,
                lastname,
                email,
                password
            })
            user.save();

            res.redirect("/");

        } catch (err) {
            console.error(err);
        };
    },

    logIn: async (req, res) => {
        try {
            let user = new User({
                email: req.body.email,
                password: req.body.password,
            });
            let result = await User.findOne({
                where: {
                    email: user.email
                }
            });
            if (!result) {
                return res.render('login', { error: 'Vérifiez votre saisie.' });
            };
            let isValid;
            if (result && req.body.password) {
                isValid = await bcrypt.compare(req.body.password, result.password);
            };
            if (isValid) {
                user = result;
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
            req.session.user = false;
            res.locals.user = false;
            res.redirect("/");

        } catch (err) {
            console.error(err);
            res.status(500).redirect("/");
        };
    },

}

module.exports = sessionController;