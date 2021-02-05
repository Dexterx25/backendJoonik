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
  let table = 'childrens'
  //singUp:
  createChildren = async (data)=>{
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
//console.log('este es el token que llega-->', data)
 const decoded = await decodeHeader(data);
 const dataToStore = {
     tokenUncrypted:decoded,
     name:data.name,
     parent_id:data.parent_id
 }
 const respon = await  store.createChildren(dataToStore, table)
return respon
     console.log('este es el decoded--->', decoded)
 function verify (token){
        return jwt.verify(token, SECRET)
      }
function decodeHeader(data){
    const authorization = data.token || '';
    const token = getToken(authorization) 
    const decoded = verify(token)

   // req.user = decoded

 return decoded;
}
  }
 getChildren = async (data)=>{

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
//console.log('este es el token que llega-->', data)
 const decoded = await decodeHeader(data);

 const dataToStore = {
     tokenUncrypted:decoded,
     parent_id:data.parent_id
 }
 const respon = await  store.getChildren(dataToStore, table)

      console.log('este es el decoded--->', decoded)

return respon
 function verify (token){
        return jwt.verify(token, SECRET)
      }
function decodeHeader(data){
    console.log('este es el data---->', data)
    const authorization = data.token || '';
    const token = getToken(authorization) 
    const decoded = verify(token)

   // req.user = decoded

 return decoded;
}

   
   
 }
 





    return  {
        create:createChildren,
        get:getChildren
        
    }
}
