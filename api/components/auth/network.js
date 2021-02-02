const express = require('express')
const response = require('../../../network/response')
const controller = require('./index')
const router = express.Router();

router.post('/login', function(req, res){
    controller.insertLogin(req.body.email, req.body.encrypted_password)

  
      .then((token)=>{
        if(!token){         

           response.error(req, res, 'user not authorized or credentials invalid', 403,  'user not authrized' )
        }else{         
            console.log('fue consumido')

          response.success(req, res,  token, 201)
        }
        
        })
       .catch((error)=>{
           response.error(req, res, 'request faild',  401, error)
       })
})

router.get('/passwords/user', function(req, res, next){
  const dataRequest = {
      email:req.body.email
  }
  
  controller.getReset(dataRequest)
  .then((respon)=>{
    response.success(req, res, respon, 200)
  })
  .catch((e)=>{
      response.error(req, res, e, 400)
  })
  
  })
  
  router.put('/passwordsreset/user', function(req, res, next){ 
      const dataRequest = {
              email: req.body.email,
              recovery_pin:req.body.recovery_pin,
              password:req.body.password,
              password_confirmation:req.body.password_confirmation
      }
  
      controller.reset(dataRequest)
      .then((respon) =>{
          response.succes(req, res, respon, 202)
      })
      .catch((e)=>{
          response.error(req, res, e, 400)
      })
  })
  
  


module.exports = router;