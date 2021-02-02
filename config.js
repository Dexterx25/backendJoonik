const config = { 

    remoteDB: process.env.REMOTE_DB || false,
    
    DBconfig:{
        user: 'joonik',   
        password: 'sadsvvex',
        host: 'localhost',
        database:'joonik_db'
    },
    
    jwt:{
        secret: process.env.JWT_SECRET ||  'apkgnaknvkamsfknajndglknadlvnmadasfkalakdv'
        //redis password: confirmapp-redisserverpjr110971asr1243cbv
        //changed for this: q6mUvhd8y7539z+yMGFnQetknyTPhmQvlgaIwrxDjKojljEjNhKQY72Tpmc2PyD02VbamA7B2GcPtyDar
    },
   
    PostgresService:{
        host: process.env.PSQL_SRV_HOST || 'localhost',
        port: process.env.PSQL_SRV_PORT || 3001
    },
    
    api:{
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost',
    publicRoute: process.env.PUBLIC_ROUTE || 'app'
    },
    
    //////--->MICROSERVICES:
    
    TransactionsService:{
    host: process.env.EVENTS_SRV_HOST || 'localhost',
    port: process.env.EVENTS_SRV_PORT || 3002
    },
    
    chatsServices:{
        host: process.env.CHATS_SRV_HOST || 'localhost',
        port: process.env.CHATS_SRC_PORT || 3004,
    },
    
    notificationsService:{
        host: process.env.NOTIFICATIONS_SRV_HOST || 'localhost',
        port: process.env.NOTIFICATIONS_SRV_PORT || 3005,  
    },
    friendsService:{
        host: process.env.FRIENDS_SRV_HOST || 'localhost',
        port: process.env.FRIENDS_SRV_PORT || 3006
    },
    cardsService:{
        host: process.env.INVITATIONS_SRV_HOST || 'localhost',
        port: process.env.INVITATIONS_SRV_PORT || 3007
    },
    devicesService:{
        host:process.env.DEVICES_SRV_HOST || 'localhost',
        port:process.env.DEVICES_SRV_PORT || 3008
    },
    ////////////////////////////////////////////////////
    
    cacheService:{
    host: process.env.CACHE_SRV_HOST || 'localhost',
    port: process.env.CACHE_SRV_PORT || 3003
    },
    
    redis:{
        host: process.env.REDIS_SRV_HOST || '127.0.0.1',
        port: process.env.REDIS_SRV_PORT || 6379,
       //pasword: process.env.REDIS_SRV_PORT  || 'q6mUvhd8y7539z+yMGFnQetknyTPhmQvlgaIwrxDjKojljEjNhKQY72Tpmc2PyD02VbamA7B2GcPtyDar'
    },
    
    EmailService:{
        NewUserInvitation:{
    //host:"smtp.ethereal.email",
            host:"smtp.gmail.com",
            port:465,
            secure:true,
           auth:{
             //  user:"jillian.zieme@ethereal.email",
             user:"confirmapphw@gmail.com",  
            // password:"YhsaV5pEyFUXeuKBJC"
            password:"uexfxodrnoonxofd"
            }
        }
    }
    
    }
    
    module.exports = config 