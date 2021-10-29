const CoreModel = require('./coreModel');

class Tag extends CoreModel {

    name;

    static tableName = 'tag';

    constructor(obj) {
        super(obj);
        this.name = obj.name;
    }
};

module.exports = Tag;