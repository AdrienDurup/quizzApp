const sequelize = require('../database');
const {DataTypes, Model} = require('sequelize');

class Quiz extends Model {}

Quiz.init({
    title: DataTypes.TEXT,
    description: DataTypes.TEXT
}, {
    sequelize,
    tableName: 'quiz'
});

module.exports = Quiz;