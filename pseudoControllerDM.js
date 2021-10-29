require('dotenv').config();
const client = require('./app/database-old');

const Level = require('./app/models-old/level');

const dataMapper = {
    getAllLevels: (callback) => {
        client.query('SELECT * FROM level', callback)
    }
}


const controller = {
    getAllLevels: (request, response) => {
        dataMapper.getAllLevels((error, result) => {
            if (error) {
                console.log(error);
                //response.status(500).send('on a eu un pépin :' + error);
            } else {
                console.log('données brutes de la BDD : ', result.rows);
                const levels = [];
                for (const row of result.rows) {
                    //différence par rapport à la S4 : on encapsule les données qui viennent de la BDD dans une instance de classe afin de pouvoir éventuellement ajouter des fonctionnalités et manipuler plus facilement les data dans l'appli
                    const level = new Level(row);
                    console.log(level.niceDebug());
                    levels.push(level);
                }
//                console.log(levels);
                //response.send(levels);
            }
        })
    }
}

controller.getAllLevels();