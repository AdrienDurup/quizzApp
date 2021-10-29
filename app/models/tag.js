const sequelize = require('../database');
const {DataTypes, Model} = require('sequelize');

class Tag extends Model {};

Tag.init({
    name: DataTypes.TEXT
}, {
    sequelize,
    tableName: 'tag'
});

module.exports = Tag;