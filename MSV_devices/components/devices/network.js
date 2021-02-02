const express = require('express')
const response = require('../../../network/response')
const controller = require('./index')
const secure = require('./secure')
const router = express.Router()

router.get('/', (req, res, next) =>{
    const dataGet = req.body
    controller(dataGet)
    .then( (dataDevice)=>{
        response.success(req, res, dataDevice, 200)
    })
    .catch( (e)=>{
        response.error(req, res, e, 400)
    })
})

router.delete('/remove/:deviceId/:loginIdentifier', secure('removeDevice') ,(req, res, next)=>{
    const requestData ={
        deviceId:req.params.deviceId,
        loginIdentifier:req.params.loginIdentifier 
        }
    console.log('este es el deviceId', requestData.deviceId)
    controller.remove(requestData)
    .then( (dataDevice)=>{
        console.log('este es', dataDevice)
        response.success(req, res, dataDevice, 200)
    })
    .catch( (e)=>{
        response.error(req, res, e, 400)
    })
})
console.log('xd')
module.exports = router;