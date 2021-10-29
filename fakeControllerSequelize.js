require('dotenv').config();

const {User, Level, Quiz, Tag, Question} = require('./app/models/');

User.findAll({
    include: 'quizzes'
})
.then(users => {
    //dans le .then, on traite le cas où tout s'est bien passé, pas d'erreur du côté SQL
    for (const user of users) {
        console.log(user.fullname);
        console.log('Ce user a écrit ' + user.quizzes.length + ' quizzes');
    }
})
.catch(error => {
    //ici, on traite l'erreur si jamais il y en a une 
    console.log(error.message)
});

Quiz.findByPk(17, {
    include: ['author', 'questions']
})
.then(quiz => {
    console.log(quiz.title + ' a été écit par ' + quiz.author.fullname + ' et contient ' + quiz.questions.length + ' questions')
})
.catch(error => console.log(error.message));

Tag.findByPk(1, {
    include: {
        association: 'quizzes',
        include: {
            association: 'questions',
            include: 'level'
        }
    }
})
.then(tag => {
    console.log(tag.quizzes[0].questions[0]);
})
.catch(error => console.log(error.message));

Question.findByPk(5, {
    include: ['level', 'answers', {
        association: 'quiz',
        include: 'tags'
    }]
})
.then(question => {
    console.log(question.question);
    console.log(question.quiz.title);
    console.log(question.quiz.tag[0]);
})
.catch(error => console.log(error.message));


Quiz.findByPk(3, {
    include: {
        association: 'questions',
        include: 'answers'
    }
})
.then(quiz => {
    console.log(quiz.title);
    console.log(quiz.questions[0]);
    console.log(quiz.questions[0].answers[0]);
})
.catch(error => console.log(error.message));

Level.findByPk(1)
.then(level => {
    console.log(level.niceDebug())
})
.catch(error => console.log(error.message));


// const controller = {
//     allUsers: (request, response) => {
//         User.findAll()
//         .then(users => {
//             response.render('users', {users})
//         })
//         .catch(error => {
//             response.status(500).send(error.message);
//         })
//     },

        // oneQuiz: (request, response) => {
        //     const id = parseInt(request.params.id);
        //     Quiz.findByPk(id, {
        //         include: ['author', 'questions']
        //     })
        //     .then(quiz => {
        //         response.render('quiz', {quiz})
        //     })
        //     .catch(error => esponse.status(500).send(error.message);
        // }
// }