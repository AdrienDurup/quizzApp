const CoreModel = require('./coreModel');

class Question extends CoreModel {

    question;
    anecdote;
    wiki;
    level_id;
    answer_id;
    quiz_id;

    static tableName = 'question';

    constructor(obj) {
        super(obj);
        for (const propName in obj) {
            if (propName !== 'id')
                this[propName] = obj[propName];
        }
    }
}

module.exports = Question;