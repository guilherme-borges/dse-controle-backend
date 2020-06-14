const express = require('express');
const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');
const ProjectController = require('./controllers/ProjectController');

const routes = express.Router();

routes.post('/users', UserController.create);
routes.get('/users', UserController.index);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.delete);

routes.post('/sessions', SessionController.create);

routes.post('/projects', ProjectController.create);
routes.get('/projects', ProjectController.index);
routes.put('/projects/:id', ProjectController.update);
routes.delete('/projects/:id', ProjectController.delete);

module.exports = routes;