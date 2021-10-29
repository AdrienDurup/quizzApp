//ce module va uniquement gérer la connexion à la BDD en passant par Sequelize

//on importe la class dont on a besoin pour se connecter
const {Sequelize} = require('sequelize');

//on instancie le client de connexion 
const sequelize = new Sequelize(process.env.PG_URL, {
    define: {
        // on ajoute une propriété pour déactiver l'ajout automatique de 2 champs qu'on n'utilise pas dans notre projet :
        //- createdAt
        //- updatedAt
        timestamps: false,
        // permet les noms de champs en snake_case
        underscored: true
    }
});

//notre client est prêt à l'emploi, on l'exporte pour l'utiliser dans notre appli
module.exports = sequelize;