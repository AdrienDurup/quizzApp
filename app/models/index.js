//fichier catalogue permettant d'effectuer un require global sur les modèles

//on commence par importer tous les modèles
//on laisse CoreModel de côté, on n'en a jamais besoin explicitement
const Answer = require('./answer');
const Level = require('./level');
const Question = require('./question');
const Quiz = require('./quiz');
const Tag = require('./tag');
const User = require('./user');


// mise en place les associations entre les modèles

//on va avoir plusieurs cas

//relation 1,n
//Pour la table qui détient le n en max, on utilise la méthode hasMany
//Pour la table qui détient le 1 en max, on -utilise la méthode belongsTo

//relation n,n
//on passe par la table intermédiaire pour stocker les relations entre 2 tables
//on utilise la méthode belongsToMany sur les 2 modèles en indiquabnt la table intermédiaire et les clés étrangères dans cette table

//relation 1,1
// on utilise la méthode belongsTo sur la table qui détient la clé étrangère
//pas de contrepartie sur l'autre table dans ce cas



// un utilisateur peut être l'auteur de plein de quizzes
// c'est lui qui a le n sur le schéma -> hasMany
//1er argument, le modèle qu'on souhaite lier
//2ème argument : object de configuration

User.hasMany(Quiz, {
    //la clé étrangère qui permet de lier les 2 entités en SQL
    foreignKey: 'user_id',
    //le nom qu'on souhaite donner aux quizzes dans une instance de User si on fait le JOIN ON
    as: 'quizzes'
});

Quiz.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'author'
});



// entre quiz et question

Quiz.hasMany(Question, {
    foreignKey: 'quiz_id',
    as: 'questions'
});

Question.belongsTo(Quiz, {
    foreignKey: 'quiz_id',
    as: 'quiz'
})

//entre question et level

Level.hasMany(Question, {
    foreignKey: 'level_id',
    as: 'questions'
});

Question.belongsTo(Level, {
    foreignKey: 'level_id',
    as: 'level'
});

// entre question et answer pour avoir la liste des réponses possibles

Question.hasMany(Answer, {
    foreignKey: 'question_id',
    as: 'answers'
});

Answer.belongsTo(Question, {
    foreignKey: 'question_id',
    as: 'question'
})

// entre quiz et tag
Quiz.belongsToMany(Tag, {
    //le nom du champ dans le 1er modèle (Quiz) dans la table intermédiaire
    foreignKey: 'quiz_id',
    //le nom du champ dans le 2ème modèle (Tag) dans la table intermédiaire
    otherKey: 'tag_id',
    //le nom de la propriété dans Quiz si on fait le join
    as: 'tags',
    //le nom de la table intermédiaire
    through: 'quiz_has_tag'
});

Tag.belongsToMany(Quiz, {
    foreignKey: 'tag_id',
    otherKey: 'quiz_id',
    as: 'quizzes',
    through: 'quiz_has_tag'
});

//cas particulier de question et answer, on a une deuxième association à indiquer : la bonne réponse
//la clé étrangère dans QUestion, on ajoute un relation belongsTo pour obtenir la bonne réponse
Question.belongsTo(Answer, {
    foreignKey: 'answer_id',
    as: 'good_answer'
});



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