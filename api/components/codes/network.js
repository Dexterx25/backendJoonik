const express = require('express')
const secure = require('./secure.js')
const response = require('../../../network/response')

const controller = require('./index')


const multer = require('multer')
const mimeTypes = require('mime-types');

const storage = multer.diskStorage({
    destination:   'public/avatar',
    filename: function(req, file, cb){
        cb("", Date.now() + "."+ file.originalname )
    }
})

var upload = multer({
    storage: storage,   
    // dest: 'public/avatar',
                     });


const router = express.Router(); //y inicializamos el router, módulo de express encargadod de las rutas


router.post('/register', async function(req, res){   


    const data = req.body
    console.log("[NETWORK]DATA USERS", data)

    controller.create(data) 
        
    .then((fieldsUsers) => {
          if(fieldsUsers.routine ==='_bt_check_unique'){
        response.error(req, res, 'User email already exist', 500, 'Security Database, posible same existing user' )

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



router.get('/',function(req, res){
  const datasFilterFetch = {
    code:req.body.code
  }
  console.log('este es la query=', datasFilterFetch.include)
    controller.get(datasFilterFetch)

  .then((dataUser)=>{
     if(dataUser == ''){
        response.success(req, res, 'code dont working!', 400)
     }
      response.success(req, res, 'code is working!', 200)
  })
  .catch((error) =>{
      response.error(req, res, 'internal Error', error, 500)
  })
})




module.exports = router;
