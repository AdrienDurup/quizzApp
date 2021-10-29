const CoreModel = require('./coreModel');

class User extends CoreModel {

    email;
    password;
    firstname;
    lastname;

    static tableName = 'user';


    constructor(obj) {
        super(obj);
        for (const propName in obj) {
            if (propName !== 'id')
                this[propName] = obj[propName];
        }
    }

    get fullname() {
        return `${this.firstname} ${this.lastname}`;
    }
}

module.exports = User;