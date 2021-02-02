const auth = require('../../../authMain')
module.exports = function cheakAuth(action){
 
 function middleware (req, res, next){
       switch(action){
           case 'removeDevice':
                auth.cheak.logged(req)
                next()
              break;

           default:
                next();

       } 

   }
   return middleware;

}