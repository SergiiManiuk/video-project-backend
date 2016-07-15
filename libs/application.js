'use strict';

const Koa = require('koa');

const log = require('./log')();

module.exports = class Application extends Koa {
  constructor() {
    super();
    this.log = log;
  }
};