const {nanoid} = require('nanoid')
const bcrypt = require('bcrypt')
const auth = require('../../../authMain')
const response = require('../../../network/response')
const ctrlDevice = require('../../../MSV_devices/components/devices/index')
const config  = require('../../../config')
module.exports = function(injectedStore){
let store = injectedStore
if(!store){
    store = require('../../../store/store')
}
////---->
let table2 = 'authentications'
let table = 'users'
//login ---->
async function insertLogin(email, encrypted_password ){
    const body = {
        email,
      //  encrypted_password
    }              
     const data = await store.insertLogin(body, table)
   console.log('contra sin encriptar: ', encrypted_password)
  return   bcrypt.compare(encrypted_password, data.rows[0].encrypted_password)
          .then(async areEqual=>{
              if(areEqual === true){
          const token = await auth.sign(data.rows[0])
          const dataUser = data.rows[0]       
const dataDevice = await ctrlDevice.add(dataUser, token)
 ///console.log('este es el dataDevice CONTROLLER AUTH', dataDevice)
    let respo = {
                token: token,
                user_id:dataUser.id,
                email:dataUser.email,
                provider:'email',
                loginIdentifier: dataDevice.rows[0].identifier
          }  
          console.log('este es el respo desde CONTROLLER AUTH', respo)
          return  respo


      
        //return 'TOKEN'
        }else{
            console.log('informacion invalida')
        } 
         
    
          }) 
          .catch((e)=>{
              console.log(e)
          })
 }

//user auth
const upsertAuth = (
    data
    ) =>{
    
   const authData = {

           uid:data.uid,
          user_id:data.id,
          encrypted_password: data.newEncrypted_password,
          provider:data.provider

      }
      
    // if(data.email){
    //     authData.email = data.email
    // }
    console.log("[authData desde Controller Auth TRAYIDO DE PROMISE USER]", authData)
   
    return  store.sendAuth(authData, table2)

}
const getReset = (data) =>{
    return new Promise( async(resolve, reject) =>{
        if(!data.email){
            reject('there are not email')
            return false
        }
        
      const respon = await store.getReset(data)
        resolve(respon)
    })
}

const resetPassword = (data) =>{
return new Promise( ( resolve, reject) =>{
   if(data.password  !== data.password_confirmation){
       reject('Passwords no equals, please verify')
       return false;
   }
   if(!data.recovery_pin){

   }

})
}


return{
    upsertAuth,
    insertLogin,
    getReset,
    reset:resetPassword
    

}


}