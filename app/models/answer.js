const sequelize = require('../database');
const {DataTypes, Model} = require('sequelize');

class Answer extends Model {};

Answer.init({
    description: DataTypes.TEXT
}, {
    sequelize,
    tableName: 'answer'
})

// const  obj = {
//     id: 25,
//     description: 'xxx',
//     question_id: 45
// };

// const answer = new Answer(obj);


module.exports = Answer;