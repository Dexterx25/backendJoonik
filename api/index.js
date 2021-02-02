const express = require('express');
const bodyParser = require('body-parser');

const swaggerUi = require('swagger-ui-express');

const config = require('../config.js');  
const cors = require('cors')

const user = require('./components/user/network');
const admin = require('./components/admin/network');
const code = require('./components/codes/network')
const auth = require('./components/auth/network');
const errors = require('../network/errors');

const app = express();
//const server = require('http').Server(app)
app.use(bodyParser.json());
//const socket = require('../socket')
//const swaggerDoc = require('./swagger.json');

// ROUER
app.use('/api/users', user);
app.use('/api/auth', auth);
app.use('/api/admins', admin)
app.use('/api/codes', code)
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/app', express.static('public'));

app.use(errors);

app.listen(config.api.port, () => {
    console.log('Api escuchando en el puerto ', config.api.port);
});

