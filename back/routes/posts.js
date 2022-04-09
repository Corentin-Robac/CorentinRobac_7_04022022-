const express = require('express');
const router = express.Router();
const models = require('../models');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const fs = require("fs");

router.post('/posts', auth, async (req, res, next) => {

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

                responsesToMessage.push( { postId: postResponse.id, userId: userDataResponse[0].id, userMessageContent: postResponse.content, attachment: postResponse.attachment, userName: userDataResponse[0].username } );

            }
            // FIN Récupérer toutes les réponses du post

            let userData = await models.User.findAll({
                where: {
                    id: post.idUSERS
                },
                attributes: ['username']
            });

            let indexInArray = posts.findIndex(object => object.postId === post.id);

            if((post.ResponseTo === 0 || post.ResponseTo === false) && indexInArray === -1){
                posts.push( { postId: post.id, userId: post.idUSERS, userMessageContent: post.content, attachment: post.attachment, userName: userData[0].username, responses: responsesToMessage } );
            }
        }
        // FIN Récupérer tous les Posts

        res.status(200).json(posts);

    }catch(err) {

        res.status(400).json({message: 'erreur'});

    }

});

router.post('/sendPost', auth, multer, async (req, res, next) => {
    try {

        if(req.body.userId === req.auth.userId){

            let imgUrl = null;
            if(req.file){
                imgUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
            }
            
            let response = await models.User.findOne({
                where: {username: req.body.currentUser},
                attributes: ['id']
            });

            await models.Message.create({
                idUSERS: response.id,
                content: req.body.message,
                attachment: imgUrl,
                ResponseTo: req.body.ResponseTo
            });

            res.status(201).json({
                message: 'Message publié',
                imageUrl: imgUrl
            });
        }else {
            res.status(401).json({
                message: 'Autorisation refusée',
            }); 
        }
    } catch (err) {
        res.status(400).json({ message: err.original.sqlMessage });
    }

});

router.delete('/deletePost', auth, async (req, res, next) => {

    try {
        if(req.body.userId === req.auth.userId){

            const resToPost = await models.Message.findOne({
                where: {
                    ResponseTo: req.body.postId
                },
                attributes: ['attachment']
            });
            if(resToPost){
                if(resToPost.attachment){
                    const stringPath = resToPost.attachment.split('/');
                    const indexNumber = stringPath.length-1;
                    fs.unlinkSync(`./images/${stringPath[indexNumber]}`);
                }
            }

            const resToResponseToPost = await models.Message.findOne({
                where: {
                    id: req.body.postId
                },
                attributes: ['attachment']
            });
            if(resToResponseToPost){
                if(resToResponseToPost.attachment){
                    const stringPath = resToResponseToPost.attachment.split('/');
                    const indexNumber = stringPath.length-1;
                    fs.unlinkSync(`./images/${stringPath[indexNumber]}`);
                }
            }


            await models.Message.destroy({
                where: {ResponseTo: req.body.postId}
            });

            await models.Message.destroy({
                where: {id: req.body.postId}
            });

            res.status(200).json({
                message: 'Message supprimé',
            });
        }else {
            res.status(401).json({
                message: 'Autorisation refusée',
            }); 
        }

    } catch (err) {

        res.status(400).json({
            message: err.original.sqlMessage
        });

    }

});

module.exports = router;