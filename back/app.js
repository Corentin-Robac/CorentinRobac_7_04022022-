const express = require('express'); // infrastructure d'applications Web Node.js minimaliste et flexible qui fournit un ensemble de fonctionnalités robuste pour les applications
const app = express();
const helmet = require('helmet'); // Sécuriser Express.js en définissant divers en-têtes HTTP
const path = require('path');

app.use(helmet()); // Sécurise les entêtes

// Routage
const postsRoutes = require("./routes/posts");
const usersRoutes = require("./routes/users");

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Accéder à l'API depuis n'importe quelle origine
    res.setHeader('Cross-Origin-Resource-Policy', 'same-site'); 
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // Ajouter les headers mentionnés aux requêtes
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // Envoyer des requêtes avec les méthodes mentionnées
    next();
});

app.use(express.json()); // Remplace bodyparser.json, extrait la partie entière du corps d'un flux de requête entrant et l'expose sur req.body comme quelque chose de plus facile à interfacer 

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api', postsRoutes);
app.use('/api', usersRoutes);

module.exports = app;