const {nanoid} = require('nanoid')
const bcrypt = require('bcrypt')
const ctrlDevice = require('../../../MSV_devices/components/devices/index')
const auth = require('../../../authMain')
const jwt = require('jsonwebtoken')
const config = require('../../../config')

module.exports = function(injectedStore, injectedCache){
    let cache = injectedCache
    let store = injectedStore
    
    if(!store ){
          store = require('../../../store/store') 
    }
    if(!cache ){
        cache = require('../../../store/store') 
  }
  let table = 'users'
  //singUp:
  
 async function createUser(
    data 
    ){ 

    return new Promise( async (resolve, reject) => {
          
             if( !data.email  ){
                 console.error("[USER CONTROLLER] email and email validation there are not equals. Try again")
                 reject('there are not email, please veryfy the field')
                 return false;
             }
             if(!data.password || !data.cpassword){
                 console.error("[USER CONTROLLER] there are not password")
              reject('there are not not password ')
            return false    
            }
             if(data.password !== data.cpassword){
             reject('Contraseña no coincide con verificación')
             return false
             }
             
     
     const  alter_id = nanoid()
     const passwordBcrypt = await bcrypt.hash(data.password, 5)
    
const body = {
            id:alter_id,
            email:data.email,       
            password:passwordBcrypt,  
              };

   resolve(store.create(body, table))
 
    })
}

async function insertLogin(email, encrypted_password ){
    const body = {
        email,
      //  encrypted_password
    }              
     const data = await store.insertLogin(body, table)
   console.log('contra sin encriptar: ', encrypted_password)
  return   bcrypt.compare(encrypted_password, data.rows[0].password)
          .then(async areEqual=>{
              if(areEqual === true){
          const token = await auth.sign(data.rows[0])
          const dataUser = data.rows[0]       
//const dataDevice = await ctrlDevice.add(dataUser, token)
 ///console.log('este es el dataDevice CONTROLLER AUTH', dataDevice)
    let respo = {
                token: token,
                user_id:dataUser.id,
               // email:dataUser.email,
               // provider:'email',
              //  loginIdentifier: dataDevice.rows[0].identifier
          }  
          
          return  respo

        }else{
            console.log('informacion invalida')
        } 
         
    
          }) 
          .catch((e)=>{
              console.log(e)
          })
 }
 getParents = async (req)=>{

    function getToken(tok){ 
        if(!tok){
            throw  error('Don`t bring Token', 401)
    
            //throw new Error('Don`t bring Token', 401)
        }
        if(tok.indexOf("Bearer ") === -1){
            throw error('formato invalido', 401)
           // throw new Error('formato invalido', 401);
        }
    
        let token = tok.replace("Bearer ", "");
    
        return token
    
    }
const SECRET = config.jwt.secret;
//console.log('este es el token que llega-->', req)
 const decoded = await decodeHeader(req);
 const respon = await  store.getParents(decoded, table)
return respon
     console.log('este es el decoded--->', decoded)
 function verify (token){
        return jwt.verify(token, SECRET)
      }
function decodeHeader(req){
    const authorization = req.headers['x-app-token']  || '';
    const token = getToken(authorization) 
    const decoded = verify(token)

   // req.user = decoded

 return decoded;
}

   
   
 }



    return  {
        create:createUser,
        insertLogin,
        getParents
        // get:getUser,
        // filter:filterUser,
        // list:listUsers,
        // update:updateUser,
        // create_UF:createUserFacebook,
       
    }
}
