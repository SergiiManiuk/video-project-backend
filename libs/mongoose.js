'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise; //mpromise is deprecated вот такая вот хуйня из-за этого

const config = require('config');

if (process.env.MONGOOSE_DEBUG) {
  mongoose.set('debug', true);
}

mongoose.connect(config.mongoose.uri, config.mongoose.options);

module.exports = mongoose;