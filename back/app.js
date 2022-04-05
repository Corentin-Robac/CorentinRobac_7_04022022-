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

app.post('/api/posts', async (req, res, next) => {

    try{

        let posts = [];
        let response;

        if(req.body.currentPage === ''){

            response = await models.Message.findAll({
                order: [
                    ['id', 'DESC']
                ],
                attributes: ['id', 'idUSERS', 'content', 'attachment', 'ResponseTo']
            });

            console.log(response)

        }else {

            let user = await models.User.findOne({
                where: {
                    username: req.body.currentPage
                },
                attributes: ['id']
            });

            response = await models.Message.findAll({
                where: {
                    idUSERS: user.id
                },
                order: [
                    ['id', 'DESC']
                ],
                attributes: ['id', 'idUSERS', 'content', 'attachment', 'ResponseTo']
            });
            console.log(response);

            for(const post of response){
                messagesAdditional = await models.Message.findAll({
                    where: {
                        id: post.ResponseTo
                    },
                    order: [
                        ['id', 'DESC']
                    ],
                    attributes: ['id', 'idUSERS', 'content', 'attachment', 'ResponseTo']
                });
                for(const messageAdditional of messagesAdditional){
                    response.push(messageAdditional);
                }
            }
            
        }

        // Récupérer tous les Posts
        for(const post of response){

            let responsesToMessage = []; // Tableau d'objets des réponses aux posts

            let messagesResponse = await models.Message.findAll({ // Données des réponses du post
                where: {
                    ResponseTo: post.id
                },
                attributes: ['id', 'idUSERS', 'content', 'attachment', 'ResponseTo']
            });

            // Récupérer toutes les réponses du post
            for(const postResponse of messagesResponse){
                
                let userDataResponse = await models.User.findAll({ // Données de l'auteur de la réponse
                    where: {
                        id: postResponse.idUSERS
                    },
                    attributes: ['id', 'username']
                  });

                  // AJOUTER CONDITION SI POST EST DEJA DANS LA LISTE

                responsesToMessage.push( { postId: postResponse.id, userId: userDataResponse[0].id, userMessageContent: postResponse.content, attachment: postResponse.attachment, userName: userDataResponse[0].username } );

            }
            // FIN Récupérer toutes les réponses du post

            let userData = await models.User.findAll({
                where: {
                    id: post.idUSERS
                },
                attributes: ['username']
              });

              console.log(post)

            if(post.ResponseTo === 0 || post.ResponseTo === false){
                posts.push( { postId: post.id, userId: post.idUSERS, userMessageContent: post.content, attachment: post.attachment, userName: userData[0].username, responses: responsesToMessage } );
            }
        }
        // FIN Récupérer tous les Posts

        res.status(200).json(posts);

    }catch(err) {

        console.log(err);
        res.status(400).json({message: 'erreur'});

    }

});

app.post('/api/subscribe', async (req, res, next) => {

    try {

        await models.User.create({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            isAdmin: 0
        });

        res.status(201).json({
            message: 'Utilisateur créé',
            name: req.body.username
        });
    

    } catch (err) {

        console.log(err)
        res.status(400).json({
            message: err.original.sqlMessage
        });

    }

});

app.post('/api/connect', async (req, res, next) => {

    try {

        let response = await models.User.findOne({
            where: {email: req.body.email, password: req.body.password},
            attributes: ['username', 'isAdmin']
        })

        if(response !== null){
            res.status(201).json({
                message: 'Bons identifiants',
                name: response.username,
                isAdmin: response.isAdmin
            });
        }else{
            res.status(201).json({
                message: response
            });
        }

    } catch (err) {

        console.log(err)
        res.status(400).json({
            message: err.original.sqlMessage
        });

    }

});

app.post('/api/sendPost', async (req, res, next) => {
    try {
        let response = await models.User.findOne({
            where: {username: req.body.currentUser},
            attributes: ['id']
        });

        await models.Message.create({
            idUSERS: response.id,
            content: req.body.message,
            attachment: req.body.attachment,
            ResponseTo: req.body.ResponseTo
        });

        res.status(201).json({
            message: 'Message publié'
        });
    } catch (err) {
        res.status(400).json({ message: err.original.sqlMessage });
    }

});

app.delete('/api/deletePost', async (req, res, next) => {

    try {

        await models.Message.destroy({
            where: {ResponseTo: req.body.postId}
        });
        await models.Message.destroy({
            where: {id: req.body.postId}
        });

        res.status(200).json({
            message: 'Message supprimé',
        });
    

    } catch (err) {

        console.log(err)
        res.status(400).json({
            message: err.original.sqlMessage
        });

    }

});

app.delete('/api/deleteUser', async (req, res, next) => {

    try {

        let idPostsToDelete =[];

        let userId = await models.User.findOne({
            where: {username: req.body.userToDelete},
            attributes: ['id']
        });

        let postsFromUser = await models.Message.findAll({
            where: {idUSERS: userId.id},
            attributes: ['id']
        });

        for(const post of postsFromUser){
            let ResponsesToPost = await models.Message.findAll({
                where: {ResponseTo: post.id},
                attributes: ['id']
            });

            for(const response of ResponsesToPost){
                idPostsToDelete.push(response.id);
            }

            idPostsToDelete.push(post.id);
        }

        if(idPostsToDelete.length != 0){
            await models.Message.destroy({
                where: {id: idPostsToDelete}
            });
        }

        await models.User.destroy({
            where: {username: req.body.userToDelete}
        });

        res.status(200).json({
            message: 'Utilisateur supprimé',
        });
    

    } catch (err) {

        console.log(err)
        res.status(400).json({
            message: err.original.sqlMessage
        });

    }

});

module.exports = app;