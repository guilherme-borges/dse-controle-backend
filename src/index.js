const express = require('express');
require('dotenv/config');
const routes = require('./routes');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

const port = process.env.PORT || 3333;
app.listen(port, () => {
    console.log('Servidor rodando na porta ' + port);
});