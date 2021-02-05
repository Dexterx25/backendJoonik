const express = require('express');
const bodyParser = require('body-parser');

const swaggerUi = require('swagger-ui-express');

const config = require('../config.js');  
const cors = require('cors')

const user = require('./components/user/network');
const parents = require('./components/parents/network')
const children = require('./components/childrens/network')
const errors = require('../network/errors');

const app = express();
//const server = require('http').Server(app)
app.use(bodyParser.json());

app.use('/', user);
app.use('/parents', parents)
app.use('/children', children)
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/app', express.static('public'));

app.use(errors);

app.listen(config.api.port, () => {
    console.log('Api escuchando en el puerto ', config.api.port);
});

