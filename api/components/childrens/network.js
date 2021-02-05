const express = require('express')
const secure = require('./secure.js')
const response = require('../../../network/response')

const controller = require('./index')

const router = express.Router(); //y inicializamos el router, módulo de express encargadod de las rutas


router.post('/:parent_id', secure('PostChildren'), async function(req, res){   


    const data = {
   name:req.body.name,
   parent_id:req.params.parent_id,
   token:req.headers.authorization
    }
    console.log("[NETWORK]DATA CHILDRENS", data)

    controller.create(data) 
        
    .then((fieldsUsers) => {
         
    response.success(req, res, fieldsUsers, 201) //
    console.log("dates: ", fieldsUsers)

         
    })

    .catch((error)=>{
        response.error(req, res, error, 400, error)
    console.log("error desde network: ",error)
    })

 })

router.get('/:parent_id', secure('getChildrens'), function(req, res){
console.log('este es el req.header.auter', req.headers.authorization)
const data = {
    parent_id:req.params.parent_id,
    token:req.headers.authorization
}
    controller.get(data)

  
      .then((token)=>{
      
          if(token.length == 0){
            response.error(req, res, 'Categoría padre no existe',  400, error)

          }else{
            response.success(req, res,  token, 200)
    
          }
     
        })
       .catch((error)=>{
           response.error(req, res, 'Categoría padre no existe',  403, error)
       })
})


module.exports = router;
