const CoreModel = require('./coreModel');

class Quiz extends CoreModel {

    title;
    description;
    user_id;

    static tableName = 'quiz';


    constructor(obj) {
        super(obj);
        this.title = obj.title;
        this.description = obj.description;
        this.user_id = obj.user_id;
    }
}

module.exports = Quiz;