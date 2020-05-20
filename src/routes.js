const express = require('express');
const UserController = require('./controllers/UserController');

const routes = express.Router();

routes.get('/users', UserController.index);
routes.post('/users', UserController.create);

routes.get('/', (req, res) => {
    return res.send('Hello World!!');
});

module.exports = routes;