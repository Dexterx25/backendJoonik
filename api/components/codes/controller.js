const {nanoid} = require('nanoid')
const bcrypt = require('bcrypt')

const controllerAuth = require('../auth/index')

module.exports = function(injectedStore, injectedCache){
    let cache = injectedCache
    let store = injectedStore
    
    if(!store ){
          store = require('../../../store/store') 
    }
    if(!cache ){
        cache = require('../../../store/store') 
  }
  let table = 'admins_codes'
  //singUp:
 

function RequestCode(data){
   
    return new Promise( async (resolve, reject )=>{
        if(!data.code){
            reject('don`t bring the code')
            return false;
        }
    const dataRespon = await store.get_c(data, table)
         resolve(dataRespon)

    })

}




    return  {
        get:RequestCode
        
       
    }
}
