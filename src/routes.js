const express = require('express');
const authMiddleware = require('./middlewares/auth');
const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');
const ProjectController = require('./controllers/ProjectController');
const ClientController = require('./controllers/ClientController');
const SaleController = require('./controllers/SaleController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);
routes.post('/users/signup', UserController.create);

routes.use(authMiddleware);
routes.post('/users', UserController.create);
routes.get('/users', UserController.index);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.delete);

routes.post('/projects', ProjectController.create);
routes.get('/projects', ProjectController.index);
routes.put('/projects/:id', ProjectController.update);
routes.delete('/projects/:id', ProjectController.delete);

routes.post('/clients', ClientController.create);
routes.get('/clients', ClientController.index);
routes.put('/clients/:id', ClientController.update);
routes.delete('/clients/:id', ClientController.delete);

routes.post('/sales', SaleController.create);
routes.get('/sales', SaleController.index);
routes.put('/sales/:id', SaleController.update);
routes.delete('/sales/:id', SaleController.delete);

module.exports = routes;