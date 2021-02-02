const express = require('express')
const bodyParser = require('body-parser')
const config = require('../config')
const errors = require('../network/errors')
const cors = require('cors')
const app = express()

app.use(bodyParser.json())
const devices = require('./components/devices/network')
app.use('/api/transactions', devices)
app.use(errors)
app.use(cors());



app.listen(config.TransactionsService.port, () =>{
    console.log('deviceService running on ', config.TransactionsService.port)
})