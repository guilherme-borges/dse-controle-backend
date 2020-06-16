const connection = require('../database/connection');

module.exports = {
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