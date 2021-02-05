const express = require('express')
const secure = require('./secure.js')
const response = require('../../../network/response')

const controller = require('./index')

const router = express.Router(); //y inicializamos el router, módulo de express encargadod de las rutas


router.post('/register', async function(req, res){   


    const data = {
        email:req.body.email,
        password:req.body.password,
        cpassword:req.body.cpassword
    }
    console.log("[NETWORK]DATA USERS", data)

    controller.create(data) 
        
    .then((fieldsUsers) => {
          if(fieldsUsers.routine ==='_bt_check_unique'){
        response.error(req, res, 'User email already exist', 400, 'Security Database, posible same existing user' )

         }else{
    response.success(req, res, fieldsUsers.rows, 201) //
    console.log("dates: ", fieldsUsers.rows)

         }
    })

    .catch((error)=>{
        response.error(req, res, error, 400, error)
    console.log("error desde network: ",error)
    })

 })

 router.post('/login', function(req, res){
    controller.insertLogin(req.body.email, req.body.password)

  
      .then((token)=>{
        if(!token){         

           response.error(req, res, 'Correo y/o contraseña no válido(s)', 401,  error )
        }else{         
            console.log('fue consumido')

          response.success(req, res,  token, 200)
        }
        
        })
       .catch((error)=>{
           response.error(req, res, 'Correo y/o contraseña no válido(s)',  401, error)
       })
})





module.exports = router;
