const store = require('../../../store/store')
//const store = require('../../../store/remote-postgres')
const controller = require('./controller')


module.exports = controller(store);