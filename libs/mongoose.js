'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const config = require('config');

if (process.env.MONGOOSE_DEBUG) {
  mongoose.set('debug', true);
}

mongoose.connect(config.mongoose.uri, config.mongoose.options);

module.exports = mongoose;