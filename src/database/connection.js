const knex = require('knex');

const configuration = require('../../knexfile');

const connection = kenx(configuration.development);

module.exports = connection;