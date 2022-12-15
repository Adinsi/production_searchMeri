const jwt = require("jsonwebtoken");

const userModels = require("../models/user");
        //  Vérifier toutes les réquetes du client
module.exports.checkUser = (req, res, next) => {
  const Token = req.cookies.jwt;
  if (Token) {
    jwt.verify(
      Token,
      process.env.TOKEN_SECRETE,
      async (error, decodedTokens) => {
        if (error) {
          res.locals.user = null;
          res.cookie("jwt", "", { maxAge: 1 });
          next();
        } else {
          let user = await userModels.findById(decodedTokens._id);
          res.locals.user = user;
          next();
        }
      }
    );
  } else {  
    res.locals.user = null;
    next();
  }
};

// S'authentifier pour la première au front-end

module.exports.requireAuth = (req, res, next) => {
 const { token } = req.cookies;
 if (token) {
   const { userId } = jwt.verify(token, process.env.TOKEN_SECRETE);
   token = userId;
 }
};
