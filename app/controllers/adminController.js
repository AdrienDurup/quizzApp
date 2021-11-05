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
            const data = await Promise.all([tags, quizz]);
            console.log(data);
            res.status(200).render("adminRoot", { tags: data[0], quizzes: data[1] });
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
                                name: req.body.tagName,
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
            const quizz_id = Number(req.body.quizz_id);
            const tag= await Tag.findByPk(tag_id);
                tag.addQuizzes(quizz_id);
        res.redirect("/admin");
    } catch(e) {
        console.error(e);
    };
},
}

module.exports = adminController;