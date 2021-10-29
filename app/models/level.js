const sequelize = require('../database');
const {DataTypes, Model} = require('sequelize');

class Level extends Model {
    niceDebug() {
        return `Level d'id ${this.id} : ${this.name}`;
    }
};

Level.init(
    //1er argument : un object qui décrit les champs de la table
    //pas besoin de déclarer le champ id, Sequelize l'ajoute automatiquement
    {
        //on définit un champ en indiquant son nom et son type
        name: DataTypes.TEXT
    }, 
    //2nd argument : un object avec les infos de connexion
    {
        //instance du client sequelize
        sequelize,
        //on indique le nom de la table en BDD
        tableName: 'level'
    }
);


module.exports = Level;
