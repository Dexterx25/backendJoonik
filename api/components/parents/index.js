//const store = require('../../../store/store')
// const store = require('../../../store/mysql');
const config = require('../../../config');

let store, cache;
if (config.remoteDB === true) {
    store = require('../../../store/remote-postgres');
    cache = require('../../../store/remote-cache');
} else {
    store = require('../../../store/store');
    cache = require('../../../store/redis');
}

const controller = require('./controller');


module.exports = controller(store, cache);