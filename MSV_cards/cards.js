const express = require('express');
const bodyParser = require('body-parser');

const swaggerUi = require('swagger-ui-express');

const config = require('../config.js');  
const cors = require('cors')

const cards = require('./components/cards/network');
const errors = require('../network/errors');

const app = express();
//const server = require('http').Server(app)
app.use(bodyParser.json());
//const socket = require('../socket')
//const swaggerDoc = require('./swagger.json');

// ROUER
app.use('/api/cards', cards);
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/app', express.static('public'));

app.use(errors);

app.listen(config.cardsService.port, () => {
    console.log('cardsService escuchando en el puerto ', config.cardsService.port);
});

