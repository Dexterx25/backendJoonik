const {nanoid} = require('nanoid')
const bcrypt = require('bcrypt')


module.exports = function(injectedStore, injectedCache){
    let cache = injectedCache
    let store = injectedStore
    
    if(!store ){
          store = require('../../../store/store') 
    }
    if(!cache ){
        cache = require('../../../store/store') 
  }
  let table = 'cards'
  //singUp:
 async function createCard(
    data, user_id
    ){ 

    return new Promise( async (resolve, reject) => {
           if(!data){
               reject('there are not camps fill')
               return false
           }
            
     
     const  alter_id = nanoid()
     //  } 
const body = {      
                     id:alter_id,
                     user_id:user_id,
                     banc_name:data. banc_name,
                     count_number:data.count_number,
                     nickname:data.nickname,
                     vcc:data.vcc,
                     type_card:data.type_card
                   //   include:data.include               
  };

  console.log("Body Object [CARD CONTROLLER]", body)
  console.log('this is the full name[USER CONTROLLER]:', body.nickname)


   resolve(store.create_C(body, table))
 
    })
}





async function updateCard(theBody, file){
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


async function listCards(user_id){ 
//return new Promise( (resolve, reject) =>{
  //  let users = users.rows
//   console.log('this is the user_id', user_id)
//    let cards  = await cache.list(user_id,table)
    
//       if(!cards){
//       console.log('no estaba en cachee, buscando en db')
//          cards = await store.list_c(user_id,table)
//           cache.update(cards, table)
//       }else{
//          console.log('datos traidos de la cache')
//       }
    cards = await store.list_c(user_id,table)

  return cards

}

async function filterCard_fullname(filterFullname){ 

         users = await store.filter_u(filterFullname, table)
  

  return users

}



function getCard(data){
   
    return new Promise( async (resolve, reject )=>{
        if(!data.id){
            reject('don`t bring the id')
            return false;
        }
    const dataUser = await store.get_card(data, table)
         resolve(dataUser)

    })

}




    return  {
        create:createCard,
        get:getCard,
        filter:filterCard_fullname,
        list:listCards,
        update:updateCard,
       
    }
}
