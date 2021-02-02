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

 router.get('/parents', function(req, res){
 
    const filterFullname = req.query
    console.log("aqui esta los fullNames-->", filterFullname)
       controller.filter(req.query) 
       .then((respon) => {
   
   response.success(req, res, respon.rows, 200)
       })
       .catch(error =>{
           response.error(req, res, 'Users Not Found', 500, error )
       })
   })
   
 

router.get('/', function(req, res){
 
 const filterFullname = req.query
 console.log("aqui esta los fullNames-->", filterFullname)
    controller.filter(req.query) 
    .then((respon) => {

response.success(req, res, respon.rows, 200)
    })
    .catch(error =>{
        response.error(req, res, 'Users Not Found', 500, error )
    })
})

router.get('/all', function(req, res){
 
 const filterFullname = req.query
 console.log("aqui esta los fullNames-->", filterFullname)
    controller.list() 
    .then((respon) => {

        response.success(req, res, respon.rows, 200)
    })
    .catch(error =>{
        response.error(req, res, 'Users Not Found', 500, error )
    })
})


router.get('/:id',secure('ObtainUserAndDevice'),function(req, res){
  const datasFilterFetch = {
    id: req.params.id,
    include: req.query.include

  }
  console.log('este es la query=', datasFilterFetch.include)
    controller.get(datasFilterFetch)

  .then((dataUser)=>{
     
      response.success(req, res, dataUser.rows, 200)
  })
  .catch((error) =>{
      response.error(req, res, 'internal Error', error, 500)
  })
})

router.put('/update/:id',secure('update'), upload.single('file'), function(req, res, next){
      console.log("estos son los headers", req.header)
    console.log("Este es el file:", req.file)
    console.log('este es el Body PUT DATA USER', req.body)
 
 const theBody = {
 id:req.params.id,
 first_name:req.body.first_name, 
 last_name:req.body.last_name, 
 email:req.body.email, 
 language:req.body.language,
 encrypted_password:req.body.encrypted_password
 }
 console.log('theBOdy [NETWORK user]', theBody)
controller.update(theBody, req.file)
.then((datasAlter)=>{
  response.success(req, res, datasAlter.rows, 202)
})
.catch(next)


})



module.exports = router;
