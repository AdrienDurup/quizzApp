//on sépare les préoccupations : Separation of Concerns
//ce module va uniquement gérer la connexion à la BDD

//import de la classe CLient du package pg
const {Client} = require('pg');

const client = new Client(process.env.PG_URL);

//on connecte le client pour le rendre prêt à l'emploi dans le reste de l'appli
client.connect();
console.log(`Connection to DB ${process.env.PG_URL} successful`);

module.exports = client;