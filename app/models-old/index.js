//fichier catalogue permettant d'effectuer un require global sur les modèles

//on commence par importer tous les modèles
//on laisse CoreModel de côté, on n'en a jamais besoin explicitement
const Answer = require('./answer');
const Level = require('./level');
const Question = require('./question');
const Quiz = require('./quiz');
const Tag = require('./tag');
const User = require('./user');




//on exporte le tout dans un object global
//on utilise la notation ES raccourcie
const index = {
    Answer,
    Level,
    Question,
    Quiz,
    Tag,
    User
};

module.exports = index;