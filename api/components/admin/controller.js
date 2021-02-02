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
  let table = 'admins'
  //singUp:
 async function createUser(
    data 
    ){ 
//sasdas
    return new Promise( async (resolve, reject) => {
            if(!data.first_name || !data.last_name || !data.email || !data.encrypted_password){
                console.error("[USER CONTROLLER] there are incomplete fields!")
                reject('Incorrect dates, fill all fields!')
                return false;

             }
             if( data.email !== data.email_validation ){
                 console.error("[USER CONTROLLER] email and email validation there are not equals. Try again")
                 reject('email and email validation there are not equals. Try again')
                 return false;
             }
             if(data.encrypted_password !== data.password_validation){
                console.error("[USER CONTROLLER] password and password validation there are not equals. Try again")
                reject('Password and Password  validation there are not equals. Try again')
                return false;
             }
     
     const  alter_id = nanoid()
     const passwordBcrypt = await bcrypt.hash(data.encrypted_password, 5)
     //  } 
const body = {        id:alter_id,
                      first_name:data.first_name,
                      last_name:data.last_name,
                      phone_number:data.phone_number,
                      email:data.email,
                      dateBirthday:data.dateBirthday,
                      newEncrypted_password:passwordBcrypt,  
                      full_name: `${data.first_name}`+ " " + `${data.last_name}`,
                   //   include:data.include               
  };

  console.log("Body Object [USER CONTROLLER]", body)
  console.log('this is the full name[USER CONTROLLER]:', body.full_name)


   resolve(store.create(body, table))
 
    })
}
async function createUserFacebook(
    data 
    ){ 

    return new Promise( async (resolve, reject) => {
            if(!data.first_name || !data.last_name || !data.email || !data.encrypted_password|| !data.provider){
                console.error("[USER CONTROLLER] there are incomplete fields!")
                reject('Incorrect dates, fill all fields!')
                return false;
            }
     
     const  alter_id = nanoid()
     const passwordBcrypt = await bcrypt.hash(data.encrypted_password, 5)
     //  } 
const body = {        id:alter_id,
                      first_name:data.first_name,
                      last_name:data.last_name,
                      phone_number:data.phone_number,
                      email:data.email,
                      dateBirthday:data.dateBirthday,
                      newEncrypted_password:passwordBcrypt,  
                      full_name: `${data.first_name}`,     
                      uid:data.uid, 
                      provider:data.provider,
                    //  include:data.include
  };
  console.log("Body Object [USER CONTROLLER]", body)
  console.log('this is the full name[USER CONTROLLER]:', body.full_name)
 const  respon = await store.create_UF(body, table)
     console.log('esta es la respuesta:', )
    controllerAuth.upsertAuth(body)
    

   resolve(respon)
 
    })
}






async function updateUser(theBody, file){
   return new Promise ((resolve, reject) =>{
        let avatarPath = ''
        if(file){
            avatarPath = `http://api.confirmapp.com:3000/app/avatar/` + file.filename 
         }
        const body ={   
            id:theBody.id,           
            avatar: avatarPath,
            first_name:theBody.first_name,
            last_name:theBody.last_name,
            email:theBody.email,
            language:theBody.language,
            encrypted_password:theBody.encrypted_password,
        }
          console.log('dates update BODY [CONTROLLER Updata]', body)

resolve(store.update(body, table))
    })
}


async function listUsers(){ 
//return new Promise( (resolve, reject) =>{
  //  let users = users.rows
   let users  = await cache.list(table)
    
      if(!users){
      console.log('no estaba en cachee, buscando en db')
         users = await store.list(table)
          cache.update(users, table)
      }else{
         console.log('datos traidos de la cache')
      }

  return users

}

async function filterUser(filterFullname){ 
//return new Promise( (resolve, reject) =>{
  //  let users = users.rows
//let users  = await cache.list(table)
    
  //    if(!users){
    //  console.log('no estaba en cachee, buscando en db')
         users = await store.filter_u(filterFullname, table)
      //    cache.update(users, table)
      //}else{
       //  console.log('datos traidos de la cache')
     // }

  return users

}



function getUser(data){
   
    return new Promise( async (resolve, reject )=>{
        if(!data.id){
            reject('don`t bring the id')
            return false;
        }
    const dataUser = await store.get(data, table)
         resolve(dataUser)

    })

}




    return  {
        create:createUser,
        get:getUser,
        filter:filterUser,
        list:listUsers,
        update:updateUser,
        create_UF:createUserFacebook,
       
    }
}
