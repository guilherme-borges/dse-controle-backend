const connection = require('../database/connection');
const { update } = require('./ProjectController');

module.exports = {
    async index(req, res) {
        try {
            const clients = await connection('clients').select('*');
            return res.status(200).json(clients);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
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
    },
    async update(req, res) {
        const { name, cnpj, email, phone } = req.body;
        const id = req.params;

        try {
            const client = await connection('clients')
                .select('*')
                .where('cnpj', cnpj)
                .first();

            if (!client) {
                return res.status(400).json({ error: 'Cliente não encontrado!' });
            }

            await connection('clients').update({
                name,
                cnpj,
                email,
                phone
            }).where('id', id);

            const clientUpdated = await connection('clients')
                .select('*')
                .where('id', id)
                .first();

            return res.status(200).json(clientUpdated);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    async delete(req, res) {
        const { id } = req.params;

        try {

            const clientId = await connection('clients')
                .select('id')
                .from('clients')
                .where('id', id)
                .first();

            if (!clientId) {
                return res.status(400).json({ error: 'Cliente não encontrado!' });
            }

            await connection('clients').where('id', id).del();

            return res.status(200).json({ message: 'Cliente deletado.' });
        } catch (error) {
            return res.status(500).json(error);
        }
    }
};