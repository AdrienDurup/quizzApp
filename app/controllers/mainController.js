import { index } from "../models";

export const mainController = {
    root: async (req, res) => {
        let result = await index.Quizz.findAll(
            {
                include: 'author',
            }
        );
        res.status(200).render("index", { result });
    },

    quizzPage: async (req, res) => {
        let result = await index.Quizz.findByPk(Number(req.params.id), {
            include: ['tags', 'author', {
                association: "questions",
                include: ['level', 'answers']
            }],

        });
        res.status(200).render("quizz", { result });

    },

    tagsPage: async (req, res) => {
        let result = await index.Tag.findAll();
        res.status(200).render("tags", { result });
    },

    tagContentPage: async (req, res) => {
        let result = await index.Tag.findByPk(Number(req.params.tag), {
            include: {
                association: 'quizzes',
                include: 'author'
            }
        });
        res.status(200).render("tag", { result });
    },

    signMeUp: async (req, res) => {
        res.render("signup")
    },
   logMeUp: async (req, res) => {
        res.render('login')
    }, 
}

