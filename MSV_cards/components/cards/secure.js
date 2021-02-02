const auth = require('../../../authMain')
module.exports = function cheakAuth(action){
 
 function middleware (req, res, next){
       switch(action){
           case 'update':
                let owner = req.body.id || req.params.id
                auth.cheak.own(req, owner)
                next()
              break;
          
           case 'createCard':
               auth.cheak.logged(req)
               next()
             break;
             case 'obtainCard':
                auth.cheak.logged(req)
                next()
              break;
           case 'obtainsAllCards':
               auth.cheak.logged(req)
               next()
               break;

           case 'filterCard_name':
               auth.cheak.logged(req)
               next()
             break;
        
           default:
                next();

       } 

   }
   return middleware;

}