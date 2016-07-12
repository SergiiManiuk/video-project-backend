'use strict';

const koa = require('koa');
const path = require('path');
const fs = require('fs');
const config = require('config');
const app = koa();

app.keys = [config.secret];

let middlewares = fs.readdirSync(path.join(__dirname, 'middlewares')).sort();

middlewares.forEach((file) => {
  app.use(require(`./middlewares/${file}`));
});


app.use(require('./routes/projects').routes());

app.listen(config.port);

console.log(`http://localhost:${config.port}`);