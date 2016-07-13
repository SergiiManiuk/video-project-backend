'use strict';

const config = require('config');
const server = require('..');
const request = require('co-request');

const Project = require('../models/project');

let getURL = (path = '/projects') => {
  return `http://localhost:${config.port}${path}`;
};

describe("Project REST API", () => {

  let existingProjectData = {
    title: "Проект Васи Пупкина"
  };

  let newProjectData = {
    title: "Проект Сергея Попова"
  };

  let existingProject;

  beforeEach(function*() {

    // load fixtures
    yield Project.remove({});
    existingProject = yield Project.create(existingProjectData);
  });

  describe("POST /projects", () => {
    it("creates a project", function*() {
      let response = yield request({
        method: 'post',
        url: getURL(),
        json: true,
        body: newProjectData
      });

      response.body.title.should.exist;
    });
  });


  describe("GET /projects/:projectById", () => {
    it("gets the project by id", function*() {
      let response = yield request.get(getURL(`/projects/${existingProject._id}`));
      JSON.parse(response.body).title.should.exist;
      response.statusCode.should.eql(200);
      response.headers['content-type'].should.match(/application\/json/);
    });

    it("returns 404 if project does not exist", function*() {
      let response = yield request.get(getURL('/projects/78h693686e04c26010ef0000'));
      response.statusCode.should.eql(404);
    });


    it("returns 404 if invalid id", function*() {
      let response = yield request.get(getURL('/projects/doesnotfind'));
      response.statusCode.should.eql(404);
    });
  });

  describe("DELETE /projects/:projectById", () => {
    it("removes project", function*() {
      let response = yield request.del(getURL(`/projects/${existingProject._id}`));
      response.statusCode.should.eql(200);
      let projects = yield Project.find({});
      projects.length.should.eql(0);
    });
  });

  it("GET /projects gets all projects", function*() {
    let response = yield request.get(getURL('/projects'));
    response.statusCode.should.eql(200);
    response.headers['content-type'].should.match(/application\/json/);
    JSON.parse(response.body).length.should.eql(1);
  });
});
