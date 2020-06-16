const connection = require('../database/connection');
const { create } = require('./ProjectController');

module.exports = {
    async create(req, res) {
        const { name, cnpj, email, phone } = req.body;

        try {
            const client = await connection('clients')
                .select('*')
                .where('cnpj', cnpj)
                .first();

            if (client) {
                return res.status(400).json({ error: 'Cliente já existe!' });
            }

            const [id] = await connection('clients').insert({
                name,
                cnpj,
                email,
                phone
            });

            const clientInserted = await connection('clients')
                .select('*')
                .where('id', id)
                .first();

            return res.status(201).json(clientInserted);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
};