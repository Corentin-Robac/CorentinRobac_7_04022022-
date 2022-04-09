const dotenv = require("dotenv").config(); // Variable d'environnement
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var models = require('../models');
const auth = require('../middleware/auth');
const MY_SECRET_KEY = process.env.SECRET_KEY;
const fs = require("fs");

router.post('/subscribe', async (req, res, next) => {

    try {

        let passwordCrypted = await bcrypt.hash(req.body.password, 10);

        const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const regexPseudo = /^[a-zA-Z0-9]+$/;
        const regexPassword = /^[A-Za-z0-9]\w{5,}$/;
        if (req.body.email.match(regexEmail)) {
            if (req.body.username.match(regexPseudo)) {
                if (req.body.password.match(regexPassword)) {

                    await models.User.create({
                        email: req.body.email,
                        username: req.body.username,
                        password: passwordCrypted,
                        isAdmin: 0
                    });

                    res.status(201).json({
                        message: 'Utilisateur créé',
                        name: req.body.username,
                        token: jwt.sign(
                            {userId: req.body.username},
                            MY_SECRET_KEY,
                            {expiresIn: '24h'}
                        )
                    });

                } else {
                    res.status(400).json({
                        message: 'Veuillez entrer un mot de passe valide(6 caractères minimum).'
                    });
                }
            } else {
                res.status(400).json({
                    message: 'Veuillez entrer un pseudo valide.'
                });
            }

        } else {
            res.status(400).json({
                message: 'Champs email non valide.'
            });
        }

    } catch (err) {

        res.status(400).json({
            message: err.original.sqlMessage
        });

    }

});

router.post('/connect', async (req, res, next) => {

    try {

        let response = await models.User.findOne({
            where: {email: req.body.email},
            attributes: ['username', 'isAdmin', 'password']
        });

        if(response !== null){

            bcrypt.compare(req.body.password, response.password)
            .then(valid => {
                if(!valid){
                    return res.status(401).json({message: 'Mot de passe incorrect'});
                }
                else{
                    return res.status(200).json({
                        message: 'Bons identifiants',
                        name: response.username,
                        isAdmin: response.isAdmin, 
                        token: jwt.sign(
                            {userId: response.username},
                            MY_SECRET_KEY,
                            {expiresIn: '24h'}
                        )
                    });
                }
            })
            .catch(error => res.status(500).json({ message: error}))

        }else{
            res.status(400).json({
                message: 'Mauvaise adresse mail'
            });
        }

    } catch (err) {

        res.status(400).json({
            message: err.original.sqlMessage
        });

    }

});

router.delete('/deleteUser', auth, async (req, res, next) => {

    try {

        if(req.body.userId === req.auth.userId || req.body.isAdmin == true){
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

                // Tous les attachments à supprimer
                let attachments = [];

                // Tous les posts à supprimer
                for(const postId of idPostsToDelete){
                    let responsePost = await models.Message.findOne({
                        where: {id: postId},
                        attributes: ['attachment']
                    })

                    if(attachments.indexOf(responsePost.attachment) === -1) {
                        attachments.push(responsePost.attachment);
                    }

                    // Tous les commentaires à supprimer
                    let responseCommentaires = await models.Message.findAll({
                        where: {ResponseTo: postId},
                        attributes: ['attachment']
                    })

                    if(responseCommentaires.attachment){
                        // Un commentaire à supprimer
                        for(const responseCommentaire of responseCommentaires.attachment){
                            if(attachments.indexOf(responseCommentaire) === -1) {
                                attachments.push(responseCommentaire);
                            }
                        }
                    }

                }

                // Supprimer les images liées aux messages
                for(const attachment of attachments){
                    if(attachment){
                        fs.unlinkSync(`./images/${attachment.split('/')[attachment.split('/').length-1]}`);
                    }
                }

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