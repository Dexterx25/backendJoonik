const config = require('../config.js')
const error = require('../utils/error')
const jwt = require('jsonwebtoken')

const SECRET = config.jwt.secret;
 function sign(data){
 return   jwt.sign(data, SECRET)
}

function verify (token){
   //   console.log('ESTEEE--->', jwt.verify(token, SECRET))
   const verifyData = jwt.verify(token, SECRET)
 console.log('verifyData--->', verifyData)
   return verifyData
}

const cheak = {
    own: function(req, owner){
     const decoded = decodeHeader(req);
    console.log("veryfy decoded token:",  decoded)

    //VERIFY IF IS OWNER:
    if (decoded.id !== owner) {
        throw error('You can`t do this', 401)
       // throw new Error('No puedes hacer esto');
    }
 },

    logged: function(req, owner){
        const decoded = decodeHeader(req);
       console.log("veryfy decoded token:",  decoded)
      
    
    }
}

function getToken(auth){ 
    if(!auth){
        throw  error('Usuario incorrecto o no autenticado', 401)

        //throw new Error('Don`t bring Token', 401)
    }
    if(auth.indexOf("Bearer ") === -1){
        throw error('formato invalido', 401)
       // throw new Error('formato invalido', 401);
    }

    let token = auth.replace("Bearer ", "");

    return token

}

function decodeHeader(req){
    const authorization = req.headers['x-app-token'] || '';
    console.log('este es el req-->', req.headers)
    const token = getToken(authorization)
    const decoded = verify(token)

    req.user = decoded

 return decoded;
}
 
module.exports = {
    sign, 
    cheak,
}