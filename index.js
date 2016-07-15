'use strict';

const path = require('path');
const fs = require('fs');
const config = require('config');

const Application = require('./libs/application');
const app = new Application();

app.keys = [config.secret];

let middlewares = fs.readdirSync(path.join(__dirname, 'middlewares')).sort();

middlewares.forEach((file) => {
  app.use(require(`./middlewares/${file}`));
});


app.use(require('./routes/projects').routes());

app.listen(config.port);

app.log.info(`http://localhost:${config.port}`)



