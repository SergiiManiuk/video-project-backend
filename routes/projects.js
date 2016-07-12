'use strict';

const Router = require('koa-router');

let router = module.exports = new Router({
  prefix: '/projects'
})

let tasksList = [
  {id: 1, title: 'Задача Один'},
  {id: 2, title: 'Задача Два'},
  {id: 3, title: 'Задача Три'},
  {id: 4, title: 'Задача Четыре'},
  {id: 5, title: 'Задача Пять'},
  {id: 6, title: 'Задача Шесть'},
  {id: 7, title: 'Задача Семь'},
];

router
  .param('projectById', function*(id, next) {
    this.taskById = tasksList.filter((task) => {
      return task.id == id;
    })[0];

    if (!this.taskById) {
      this.throw(404);
    }

    yield* next;
  })

  .post('/', function*(next) {
    let newTask = {
      id: tasksList[tasksList.length - 1].id + 1,
      title: this.request.body.title
    };
    tasksList.push(newTask);
    this.body = newTask;
  })

  .get('/:projectById', function*(next) {
    this.body = this.taskById;
  })

  .del('/:projectById', function*(next) {
    let indexTask = tasksList.indexOf(this.taskById);
    tasksList.splice(indexTask, 1);
    this.body = `Removed project with ID: ${indexTask}`;
  })

  .get('/', function*(next) {
    this.body = tasksList;
  });

