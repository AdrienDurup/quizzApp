const sequelize = require('../database');
const {DataTypes, Model} = require('sequelize');

class Question extends Model {}

Question.init({
    question: DataTypes.TEXT,
    anecdote: DataTypes.TEXT,
    wiki: DataTypes.TEXT
}, {
    sequelize,
    tableName: 'question'
});

module.exports = Question;