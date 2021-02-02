const {nanoid} = require('nanoid')
module.exports = function(injectedStore, injectedCache){

    let cache = injectedCache
    let store = injectedStore
    
    if(!store ){
          store = require('../../../store/store') 
    }
    if(!cache ){
        cache = require('../../../store/store') 
  }
  let table = 'devices'
  

  const addDevice = async (dataUser, token) =>{
           // console.log('aqui esta la data del usuario logeado:', dataUser.id)
           const deviceId = nanoid()
          let deviceIdentifier;
          if(dataUser.full_name){
              deviceIdentifier = dataUser.full_name
          }else{
              deviceIdentifier = dataUser.first_name
          }
          const indentifierCode = nanoid()
       const dataToCreate = {
                id:deviceId,
                identifier:indentifierCode,
                os:1,
                user_id:dataUser.id,
                token:token

       }
       console.log('all data: ', dataToCreate)
       //console.log('aqui esta el token:', dataToCreate.token)
       const dataDevice = await store.add_D(dataToCreate, table)
       return dataDevice;

  }

  const getDevice = (data) =>{
      return new Promise( async (resolve, reject)=>{
            if(!data){
                reject('there are not data')
                return false;
            }
        const  dataUserDevice = await store.get_D(data, table)

        resolve(dataUserDevice)
      })
  }
  
  const removeDevice = (data) =>{
       return new Promise( async (resolve, reject) =>{
           if(!data){
               reject('There are not Data of Device')
               return false;
           }
        
        const respon = await store.remove_D(data, table)
    
        resolve(respon)

       })
  }

    return{
        add:addDevice,
        get:getDevice,
        remove:removeDevice,
    }
}






