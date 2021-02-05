const express = require('express')
const secure = require('./secure.js')
const response = require('../../../network/response')

const controller = require('./index')

const router = express.Router(); //y inicializamos el router, módulo de express encargadod de las rutas
router.post('/', secure('postData'), function(req, res){
  console.log('este es el req.header.auter', req.headers['x-app-token'])
  const datas = {
    req:req,
    body:req.body
  }
      controller.postParents(datas)
  
    
        .then((token)=>{
        
  
            response.success(req, res,  token, 200)
       
          })
         .catch((error)=>{
             response.error(req, res, 'Usuario incorrecto o no autenticado',  403, error)
         })

})
router.get('/', secure('getParems'), function(req, res){
  console.log('este es el req.header.auter', req.headers['x-app-token'] )
  
  
  
      controller.getParents(req)
  
    
        .then((token)=>{
        
  
            response.success(req, res,  token, 200)
       
          })
         .catch((error)=>{
             response.error(req, res, 'Usuario incorrecto o no autenticado',  403, error)
         })
  })


module.exports = router;
