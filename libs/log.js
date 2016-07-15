'use strict';

const path = require('path');
const bunyan = require('bunyan');

module.exports = function(name) {
  if (!name) {
    let filename = module.parent.filename;
    name = path.basename(filename, '.js');
    if (name === 'index') {
      name =  `${path.basename(path.dirname(filename))}/index`;
    }
  }

  var logger = bunyan.createLogger({
    name: name,
    // stream: process.stdout
  });

  return logger;
};
