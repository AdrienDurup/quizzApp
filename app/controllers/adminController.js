const { Tag, Quizz, User } = require("../models");

const adminController = {
    accessControl: (req, res, next) => {
        const user = req.session.user;
        console.log("access control : ", user.email, user.role);
        if (user && user.role === "admin") {
            next();
        } else {
            res.status(401).send("E 401. Access denied.");
        }
    },
    adminRoot: async (req, res) => {
        try {
            const tags = Tag.findAll(
                {
                    order: ["name"]
                }

            );
            const quizz = Quizz.findAll(
                {
                    order: ["title"]
                }

            );
            //Déconstruction d’Array : revoir
            const [tagList, quizList] = await Promise.all([tags, quizz]);
            res.status(200).render("adminRoot", { tags: tagList, quizzes: quizList });
        } catch (e) {
            console.error(e);
        };


    },
    updateTags: async (req, res) => {
        try {
            console.log(req.body);
            /* créer */
            if (req.body.name) {
                if (!req.body.id) {
                    const found = await Tag.findOrCreate(
                        {
                            where: {
                                name: req.body.name,
                            }
                        }
                    );
                    /* update */
                } else {
                    const id = Number(req.body.id);
                    const tag = await Tag.findByPk(id);
                    tag.name = req.body.name;
                    tag.save();
                };
            };


            res.redirect("/admin");
        } catch (e) {
            console.error(e);
        };
    },
    addTagToQuizz: async (req, res) => {
        try {
            console.log(req.body);
            const tag_id = Number(req.body.tag_id);
            // const tag_id =23;//test
            const quizz_id = Number(req.body.quizz_id);
            const tag = await Tag.findByPk(tag_id);
            tag.addQuizzes(quizz_id);//la methode est créée automatiquement par Sequelize
        } catch (e) {
            adminController.addError(req, res, e, "Echec de la requête. Un élément spécifié n’est pas valide.");
            // adminController.addError(req, res, e, "Echec de la requête. Un élément spécifié n’est pas valide.");
        }finally{
        res.redirect("/admin");
        };
    },
    addError: (req, res, e, msg) => {
        console.error(e);
        if (!req.session.admin_errors) {
            req.session.admin_errors = [];
        };
        res.locals.admin_errors = req.session.admin_errors;
        res.locals.admin_errors.push(msg);
    },
    consumeError: (req, res, next) => {
        res.locals.admin_errors=[];//pour etre sûr on fait un reset pour renvoyer un tableau vide en cas d’absence d’erreur
        
        if (req.session.admin_errors) {//s’il y a des messages d’erreur stockés,
            res.locals.admin_errors=req.session.admin_errors;//on les met dans la réponse
        };
        //on efface les erreurs de la session afin qu’elle ne persiste pas entre 2 refresh, 
        //puisque les messages seront consommés dans la prochaine vue
        delete req.session.admin_errors;
        // on passe à la route qui consommera les MSG
        next();
    }

}

module.exports = adminController;