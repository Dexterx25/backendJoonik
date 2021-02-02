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


router.post('/register/:user_id', secure('createCard'), async function(req, res){   


    const data = req.body
    const user_id = req.params.user_id
    console.log("[NETWORK]DATA cards", data)

    controller.create(data, user_id) 
        
    .then((fieldsUsers) => {
          if(fieldsUsers.routine ==='_bt_check_unique'){
        response.error(req, res, 'User card already exist', 500, 'Security Database, posible same existing user' )

         }else{
    response.success(req, res, fieldsUsers, 201) //
    console.log("dates: ", fieldsUsers.rows)

         }
    })

    .catch((error)=>{
        response.error(req, res, error, 400, error)
    console.log("error desde network: ",error)
    })

 })


router.get('/',secure('filterCard_name') ,function(req, res){
 
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

router.get('/all/:user_id', secure('obtainsAllCards') , function(req, res){
 
    controller.list(req.params.user_id) 
    .then((respon) => {

        response.success(req, res, respon, 200)
    })
    .catch(error =>{
        response.error(req, res, error, 500, error )
    })
})


router.get('/:id',secure('obtainCard'),function(req, res){
  const datasFilterFetch = {
    id: req.params.id,
    include: req.query.include

  }
  console.log('este es la query=', datasFilterFetch.include)
    controller.get(datasFilterFetch)

  .then((dataUser)=>{
     
      response.success(req, res, dataUser, 200)
  })
  .catch((error) =>{
      response.error(req, res, 'internal Error', error, 500)
  })
})

router.put('/update/:id',secure('update'), upload.single('file'), function(req, res, next){
    const theBody = req.params.id
 console.log('theBOdy [NETWORK user]', theBody)
controller.update(theBody, req.file)
.then((datasAlter)=>{
  response.success(req, res, datasAlter.rows, 202)
})
.catch(next)


})



module.exports = router;
