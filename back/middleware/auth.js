const dotenv = require("dotenv").config(); // Variable d'environnement
const jwt = require('jsonwebtoken');
const MY_SECRET_KEY = process.env.SECRET_KEY;

module.exports = (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    const decodedToken = jwt.verify(token, MY_SECRET_KEY);
    const userId = decodedToken.userId;
    req.auth = {userId: userId}
    if ( (req.body.userId && req.body.userId === userId) || (!req.body.userId) || (req.body.userId && req.body.isAdmin == true) ){
        next();
    } else {
        throw 'Invalid user ID';
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};