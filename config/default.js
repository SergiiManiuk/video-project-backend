'use strict';

module.exports = {
  port: 8000,
  root: process.cwd(),
  mongoose: {
    uri:'mongodb://localhost/video-project',
    options: {
      server: {
        socketOptions: {
          keepAlive: 1
        },
        poolSize: 5
      }
    }
  },
  secret: 'snaypssnp'
};
