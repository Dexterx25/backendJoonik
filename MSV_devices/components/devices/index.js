const config = require('../../../config')

if (config.remoteDB === true) {
    store = require('../../../store/remote-postgres');
    cache = require('../../../store/remote-cache');
} else {
    store = require('../../../store/store');
    cache = require('../../../store/redis');
}

const controller = require('./controller')




module.exports = controller(store, cache)