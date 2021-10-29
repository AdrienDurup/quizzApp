require('dotenv').config();

const {Level, Question, Tag, User} = require('./app/models-old');

// console.log('tableName dans CoreModel', CoreModel.tableName);
// console.log('tableName dans Level', Level.tableName);

const controller = {

    findAllLevels: (request, response) => {
        Level.findAll((error, levels) => {
            if (error) {
                console.log(error);
            } else {
                //dans la vraie vie, on ferait ça
                //response.render('levels', {levels})
                
                //on n'est pas dans la vraie vie mais en mode test,
                //on boucle sur le tableau pour afficher quelque chose
                for (const level of levels) {
                    console.log(level.niceDebug());
                }
            }
        });
    },

    findAllUsers: (request, response) => {
        User.findAll((error, users) => {
            if (error) {
                console.log(error);
            } else {
                for (const user of users) {
                    console.log(user.fullname);
                }
            }
        });
    },

    findOneQuestion: (request, response) => {
        Question.findOne(1, (error, question) => {
            if (error) {
                console.log(error);
            } else {
                console.log(question);
            }
        })
    },

    findOneTag: (request, response) => {
        Tag.findOne(1, (error, tag) => {
            if (error) {
                console.log(error);
            } else {
                console.log(tag);
            }
        })
    }
}

controller.findByParams();


//controller.findOneTag();

let user = new User({
    email: 'q@s.fr',
    password: '1234',
    firstname: 'Nico',
    lastname: 'Charpin'
});

// user.insert((error, user) => {
//     if (error) {
//         console.log(error.message);
//     } else {
//         console.log(user.fullname);
//     }
// });


user = new User({
    id: 5,
    email: 'q@s.fr',
    password: '1234',
    firstname: 'Nicolas',
    lastname: 'Charpin'
});

// user.update((error, user) => {
//     if (error) {
//         console.log(error.message);
//     } else {
//         console.log(user.fullname);
//     }
// });

// user.delete((error, bool) => {
//     if (error) {
//         console.log(error);
//     } else if (bool === true) {
//         console.log('Enregistrement supprimé');
//     } else {
//         console.log(`Enregistrement d'id ${user.id} non trouvé`);
//     }
// })


// const tag = new Tag({
//     id: 7,
//     name: 'Nature et écologie'
// });

// tag.update();


// User.findAll((error, users) => {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log(`On a ${users.length} utilisateurs en BDD`);
//     }
// });


// Question.findOne(3, (error, question) => {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log(question);
//     }
// })


// const level = new Level({
//     name: 'Difficile et piquant'
// });

// level.insert((error, newLevel) => {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log(newLevel.niceDebug());
//     }
// })

// const params = {
//     propName1: value1,
//     propName2: value2
// }


// Level.findBy({
//     name: 'Difficile et piquant',
//     id: 9
// }, (error, instances) => {
//     if (error) {
//         console.log(error);
//     } else {
//         for (const instance of instances) {
//             console.log(instance);
//         }
//     }
// });

// User.findBy({
//     firstname: 'Nico' 
// }, (error, instances) => {
//     if (error) {
//         console.log(error);
//     } else {
//         for (const instance of instances) {
//             console.log(instance);
//         }
//     }
// });

