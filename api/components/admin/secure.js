const auth = require('../../../authMain')
module.exports = function cheakAuth(action){
 
 function middleware (req, res, next){
       switch(action){
           case 'update':
                let owner = req.body.id || req.params.id
                auth.cheak.own(req, owner)
                next()
              break;
              case 'ObtainUserAndDevice':
               auth.cheak.logged(req)
               next()
             break;
           default:
                next();

       } 

   }
   return middleware;

}