const jwt = require('jsonwebtoken');

module.exports = function (req,res,next){
  const token = req.header('auth-token');
  if(!token){
    const error = new Error('Invalid Token');
    error.name = 'UnauthorizedError';
    throw error;
  } 
  try{
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  }catch(err){
    const error = new Error('Invalid Token');
    error.name = 'UnauthorizedError';
    throw error;
  }

}