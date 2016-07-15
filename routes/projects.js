'use strict';

const Router = require('koa-router');

const mongoose = require('../libs/mongoose');

const Project = require('../models/project');

let router = module.exports = new Router({
  prefix: '/projects'
});


router
  .param('projectById', function* (id, next) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
      this.throw(404);
    }

    this.projectById = yield Project.findById(id);

    if (!this.projectById) {
      this.throw(404);
    }

    yield* next;
  })

  .post('/', function* (next) {
    let project = yield Project.create({
      title: this.request.body.title
    });

    this.body = project.toObject();
  })

  .get('/:projectById', function* (next) {
    this.body = this.projectById.toObject();
  })

  .del('/:projectById', function* (next) {
    yield this.projectById.remove({});
    this.body = 'ok';
  })

  .get('/', function* (next) {
    let projects = yield Project.find({}).lean();
    this.body = projects;
  });


