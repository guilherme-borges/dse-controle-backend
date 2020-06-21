const connection = require('../database/connection');

module.exports = {
    async index(req, res) {
        try {
            const sales = await connection('sales')
                .innerJoin('clients', 'clients.id', '=', 'sales.client_id')
                .innerJoin('projects', 'projects.id', '=', 'sales.project_id')
                .select('sales.*', 'clients.name as client', 'projects.name as project');

            return res.status(200).json(sales);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    async create(req, res) {
        const { additional_sales, client_id, hours_sold, project_id, value } = req.body;
        try {

            const [id] = await connection('sales').insert({
                additional_sales,
                client_id,
                hours_sold,
                project_id,
                value
            });

            const saleInserted = await connection('sales')
                .select('*')
                .where('id', id)
                .first();

            return res.status(201).json(saleInserted);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    async update(req, res) {
        const { additional_sales, client_id, hours_sold, project_id, value } = req.body;
        const { id } = req.params;
        try {
            const sale = await connection('sales')
                .select('*')
                .where('id', id)
                .first();

            if (!sale) {
                return res.status(400).json({ error: 'Venda não encontrada!' });
            }

            await connection('sales').update({
                additional_sales,
                client_id,
                hours_sold,
                project_id,
                value
            }).where('id', id);

            const saleUpdated = await connection('sales')
                .select('*')
                .where('id', id)
                .first();

            return res.status(200).json(saleUpdated);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    async delete(req, res) {
        const { id } = req.params;

        try {

            const sale = await connection('sales')
                .select('*')
                .where('id', id)
                .first();

            if (!sale) {
                return res.status(400).json({ error: 'Venda não encontrada!' });
            }

            await connection('sales').where('id', id).del();

            return res.status(200).json({ message: 'Venda deletada.' });
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}