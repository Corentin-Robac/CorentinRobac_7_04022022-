const express = require('express');
const app = express();
var models = require('./models');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Accéder à l'API depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // Ajouter les headers mentionnés aux requêtes
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // Envoyer des requêtes avec les méthodes mentionnées
    next();
});

app.use(express.json()); // Remplace bodyparser.json, extrait la partie entière du corps d'un flux de requête entrant et l'expose sur req.body comme quelque chose de plus facile à interfacer 

app.use('/api/posts', async (req, res, next) => {

    const users = await models.User.findAll();
    console.log(users[0].dataValues.id);

    res.status(201).json({

        // Chercher dans la bdd, le plus récent en 1er
        posts:[
            {
                userId: 1,
                postId: 1,
                isResponse: false,
                userImageUrl: '../assets/profil-icon.png',
                userName: 'John Doe',
                userMessageContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel lorem dolor. Vivamus ac est vehicula, maximus massa eu, semper dui. Proin rhoncus faucibus lorem a hendrerit. Suspendisse dignissim dapibus interdum.',
                responses: [
                    {
                        userId: 3,
                        postId: 3,
                        isResponse: true,
                        userImageUrl: '../assets/profil-icon.png',
                        userName: 'Jeanne Ode',
                        userMessageContent: 'Phasellus sed libero id enim bibendum tempor id eu nisl ?'
                    },
                    {
                        userId: 4,
                        postId: 4,
                        isResponse: true,
                        userImageUrl: '../assets/profil-icon.png',
                        userName: 'Jean Edo',
                        userMessageContent: 'Libero id enim bibendum  consectetur adipiscing elit.'
                    },
                ]
            },
            {
                userId: 2,
                postId: 2,
                isResponse: false,
                userImageUrl: '../assets/profil-icon.png',
                userName: 'Jack Joe',
                userMessageContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel lorem dolor. Vivamus ac est vehicula, maximus massa eu, semper dui. Proin rhoncus faucibus lorem a hendrerit. Suspendisse dignissim dapibus interdum.',
                responses: [
                    {
                        userId: 5,
                        postId: 5,
                        isResponse: true,
                        userImageUrl: '../assets/profil-icon.png',
                        userName: 'Ole Fern',
                        userMessageContent: 'Phasellus sed libero id enim bibendum tempor id eu nisl ?'
                    },
                    {
                        userId: 6,
                        postId: 6,
                        isResponse: true,
                        userImageUrl: '../assets/profil-icon.png',
                        userName: 'Anne Ed',
                        userMessageContent: 'Libero id enim bibendum  consectetur adipiscing elit.'
                    },
                ]
            }
          ]


    });
});

module.exports = app;