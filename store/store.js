const chalk = require('chalk')
const pool = require('../db')
const {nanoid} = require('nanoid')
const bcrypt = require('bcrypt')
const { bgRed } = require('chalk')
const { set } = require('../mailer')

 async function createUser(body, table)  { 
    console.log('THE body in STORE: ', body)   
    
    
        try{   
    
    console.log('THE table IS:', table)
    const method = `INSERT INTO ${table}(id, first_name, last_name, phone_number, email, dateBirthday, encrypted_password, full_name) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING * `
    const values = [`${body.id}`, `${body.first_name}`, `${body.last_name}`, `${body.phone_number}`, `${body.email}`, `${body.dateBirthday}`, `${body.newEncrypted_password}`, `${body.full_name}`]
       const fieldsUsers = await pool.query(method, values)  
     return fieldsUsers
    }catch(error){
    
    console.log(chalk.red("ERROR internal, SECURITY DATABASE:", error))
    return  error
    }
    
}
  const createUserFacebook = async (body, table) =>{
    try{   
  
      console.log('THE table IS:', table)
      const method = `INSERT INTO ${table}(id, first_name, last_name, phone_number, email, dateBirthday, encrypted_password, full_name) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING * `
      const values = [`${body.id}`, `${body.first_name}`, `${body.last_name}`, `${body.phone_number}`, `${body.email}`, `${body.dateBirthday}`, `${body.newEncrypted_password}`, `${body.full_name}`]
         const fieldsUsers = await pool.query(method, values)  
       return fieldsUsers
      }catch(error){
      
      console.log(chalk.red("ERROR internal, SECURITY DATABASE:", error))
      return  error
      }
}      
  const sendAuth = async (authData, table2) =>{
      try{
                   console.log("authDatas desde sendAuth function: ", authData)
                   console.log('en table:', table2)
             const methodAuth = `INSERT INTO ${table2}(user_id, uid, encrypted_password, provider) VALUES($1, $2, $3, $4)  RETURNING *`
             const valuesAuth = [authData.user_id, authData.uid,  authData.encrypted_password, authData.provider]
             console.log('ESTE ES EL PROVIDER COLEEE:', authData.provider )
          
             const fieldsAuthUser = await pool.query("INSERT INTO authentications(user_id, uid, encrypted_password ) VALUES($1, $2, $3)",[authData.user_id, authData.uid,  authData.encrypted_password])
             console.log("values Bring of Auth Controller:", valuesAuth)
             console.log("campos de authenticacion: ", fieldsAuthUser)
             }catch(e){
             console.log("this is the error for auth:", e)
             }
}
  const getUser = async (data, table) =>{
    console.log('este es el data_id de usuario que vamos a filtrar', data.id)
    console.log('query? manda esta:',data.include)
    console.log('este es la table a filterar', table)
  
    const table2 = 'devices'
    try{
     
  
      const method1 = `SELECT * FROM ${table} WHERE id = $1`
        const method2 = `SELECT ${table}.id as user_id,  ${table}.full_name, ${table}.first_name,  
                        ${table}.last_name, ${table}.avatar,
                        ${table}.email, ${table}.facebook_avatar, ${table}.unseen_notifications, 
                        ${table2}.token, ${table2}.identifier, ${table2}.id as device_id, ${table2}.created_at
                        FROM ${table} INNER JOIN ${table2} ON ${table}.id = ${table2}.user_id WHERE users.id = $1`
      let value = [data.id]
      let dataUser
      if(data.include){
        console.log('hacemos Inner Join para traer device:')
          dataUser = await pool.query(method2, value) 
        return dataUser 
        }else{
        console.log('Traemos solo datos de Users')
          dataUser = await pool.query(method1, value) 
        return dataUser   
        }
    //  console.log('this is de userDatas [STORE]', dataUser)
    //  return dataUser;
    }catch(error){
     console.log('this is the error: ', error)
    return error
    }
  
}
  const insertLogin = async (body) =>{
          
          try{
            methodRequesUser = 'SELECT * FROM users WHERE email = $1'
            valuesRequestUser = [body.email]
               const dataUser = await pool.query(methodRequesUser, valuesRequestUser)
               console.log('id de usuario desde reques function STORE: ', dataUser)
               return dataUser
          }catch(error){
            console.log(error)
          }
}
  const resquestEmailReset = async(data) =>{
    try{
      methodRequesUser = 'SELECT email, full_name, avatar FROM users WHERE email = $1'
      valuesRequestUser = [data.email]
         const respon = await (await pool.query(methodRequesUser, valuesRequestUser)).rows
         console.log('request de usuario desde reques function STORE: ', respon)
         return respon
    }catch(error){
      console.log(error)
    }
} 
  const listUsers = async(table) =>{ 
           try{
               const respon = await pool.query(`SELECT id, full_name, avatar, email, facebook_avatar FROM ${table}`)
               console.log("STORE RESPON", respon)
               return respon
              }catch(error){
              console.log("this is the error:", error)
              return error
              }
             
            //   return Model.find();//hacemos un retornamiento al find del modelo, una busqueda a nuestro Model que esta
                           //función listUsers va a estar llamada por el controller.js
}
  const updateUser = async (body, table) =>{
        try{
   
    const full_name = `${body.first_name} ${body.last_name}`
     const datasAlter = await pool.query(`UPDATE ${table} SET first_name = $1, last_name = $2, email = $3, avatar = $4, full_name = $5, language = $6 WHERE id =  $7 RETURNING *`,[body.first_name, body.last_name, body.email, body.avatar, full_name, body.language, body.id] )       
      
     //  console.log('date bring of database: ', body)
     //  console.log("avatar?", body.avatar,  body.first_name)
     //  console.log('alter TABLE [STORE]', datasAlter)
   
    return datasAlter  
        }catch(error){
          console.log(error)
        return error 
      //  console.log('error of update dates: ', error)
       }
}


module.exports = {
    //users:
    create:createUser,    
    list:listUsers,
   // filter_u,
    get:getUser,
    update:updateUser,

    //auth:
    sendAuth,
    insertLogin,
    create_UF:createUserFacebook,
    getReset:resquestEmailReset,

}