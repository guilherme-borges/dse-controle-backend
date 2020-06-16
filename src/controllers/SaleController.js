const connection = require('../database/connection');

module.exports = {
    async index(req, res) {
        try {
            const sales = await connection()
                .from('sales')
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
    }
}