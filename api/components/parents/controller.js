const {nanoid} = require('nanoid')
const bcrypt = require('bcrypt')
const ctrlDevice = require('../../../MSV_devices/components/devices/index')
const auth = require('../../../authMain')
const jwt = require('jsonwebtoken')
const config = require('../../../config')
const { postParents } = require('.')

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


  const postParents = async(data)=>{

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
 const decoded = await decodeHeader(data.req);

const dataToStore = {
    token:decoded,
    data:{
        description:data.body.description
    }
}
 const respon = await  store.postParents(dataToStore, table)
 if(!data.body.description){
  return 'there are not description!'   
}else{
    return respon
  
}
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
        postParents,
        getParents
        // get:getUser,
        // filter:filterUser,
        // list:listUsers,
        // update:updateUser,
        // create_UF:createUserFacebook,
       
    }
}
