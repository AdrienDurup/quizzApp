const sequelize = require('../database');
const {DataTypes, Model} = require('sequelize');

class User extends Model {

    get fullname() {
        return `${this.firstname} ${this.lastname}`;
    }
}

User.init({
    email: {
        type: DataTypes.TEXT,
        validate: {
            isEmail: true
        }
    },
    password: DataTypes.TEXT,
    firstname: DataTypes.TEXT,
    lastname: DataTypes.TEXT
}, {
    sequelize,
    tableName: 'user'
});

module.exports = User;
