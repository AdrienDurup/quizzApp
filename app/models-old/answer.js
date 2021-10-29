const CoreModel = require('./coreModel');

class Answer extends CoreModel {

    description;
    question_id;

    static tableName = 'answer';


    constructor(obj) {
        console.log('Je suis dans le constructor');
        //on a déporté la logique de gestion de l'id dans le CoreModel
        //on ne réinvente aps la roue, on laisse le CoreModel initialise la valeur de l'id via son constructeur
        super(obj);

        console.log(`J'ai donné la valeur ${obj.id} à ma propriété id : ${this.id}`);
        this.description = obj.description;
        this.question_id = obj.question_id;
    }

};

// const  obj = {
//     id: 25,
//     description: 'xxx',
//     question_id: 45
// };

// const answer = new Answer(obj);


module.exports = Answer;