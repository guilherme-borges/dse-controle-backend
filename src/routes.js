const express = require('express');
const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.get('/users', UserController.index);
routes.post('/users', UserController.create);
routes.delete('/users/:id', UserController.delete);

routes.post('/sessions', SessionController.create);

routes.get('/', (req, res) => {
    return res.send('Hello World!!');
});

module.exports = routes;