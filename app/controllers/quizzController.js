const { Quizz, Answer, Question } = require("../models");
const quizzController = {
    quizzPage: async (req, res) => {
        let result = await Quizz.findByPk(Number(req.params.id), {
            include: ['tags', 'author', {
                association: "questions",
                include: ['level', 'answers']
            }],

        });
        const user = req.session.user;
        if (user) {
            res.status(200).render("play_quizz", { result });
        } else {
            res.status(200).render("quizz", { result });
        };
    },
    getQuizzScore: async (req, res) => {
        try {
            // const answers = req.body;//{question_id:answer_id,question_id:answer_id…}
            const answers = {//pour test
                '1': '1',
                '4': '778',
                '7': '781',
                '10': '784',
                '13': '787',
                '16': '790',
                '19': '793',
                '22': '796',
                '25': '799',
                '28': '802'
            }
            console.log(req.body);
            const score = { total: 0, questRes: [] };
            let sqlzRes;
            for (key in answers) {

                const userAnswerId = Number(answers[key]);

                console.log(Number(answers[key]), Number(key));
                sqlzRes = await Question.findByPk(
                    Number(key),
                    {
                        include: ['good_answer', 'answers','quizz']
                    }
                );


                if (sqlzRes) {
                    if (sqlzRes.good_answer.id === userAnswerId) {
                        score.total++;
                    };
                    sqlzRes.userRes = sqlzRes.answers.find(el => el.id === userAnswerId);
                    sqlzRes.quizz=sqlzRes.quizz.id;
                    score.questRes.push(sqlzRes);
                };
                console.log("scoreTolat", score.total);
            };
            /* 
            TODO récupérer la bonne réponse pour l’afficher ?
            */
            res.render("quizzScore", { score });
        } catch (e) {
            console.log(e);
            res.status(500).send(e);
        };
    },
}
module.exports = quizzController;