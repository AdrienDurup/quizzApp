const CoreModel = require('./coreModel');
const client = require('../database');

class Level extends CoreModel {

    //id
    name;

    static tableName = 'level';


    constructor(obj) {
        super(obj);
        //this.id = obj.id
        this.name = obj.name;
    }
    niceDebug() {
        return `Level d'id ${this.id} : ${this.name}`;
    }
};


module.exports = Level;
