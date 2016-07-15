'use strict';

module.exports = {
  port: 3000,
  root: process.cwd(),
  mongoose: {
    uri:'mongodb://localhost/video-project-test',
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
