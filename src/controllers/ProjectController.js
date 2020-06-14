const connection = require('../database/connection');

module.exports = {
    async index(req, res) {

        try {
            const projects = await connection('projects').select('*');
            return res.status(200).json(projects);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    async create(req, res) {
        const { name } = req.body;
        try {
            const project = await connection('projects')
                .select()
                .from('projects')
                .where('name', name)
                .first();

            if (project) {
                return res.status(400).json({ error: 'Projeto já existe!' });
            }

            const [id] = await connection('projects').insert({
                name
            });

            const projectInserted = await connection('projects')
                .select('*')
                .where('id', id)
                .first();

            return res.status(201).json(projectInserted);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    async update(req, res) {
        const { name } = req.body;
        const { id } = req.params;

        const project = await connection('projects')
            .select()
            .from('projects')
            .where('id', id)
            .first();

        if (!project) {
            return res.status(400).json({ error: 'Projeto não encontrado!' });
        }

        await connection('projects').update({
            name
        }).where('id', id);

        const projectUpdated = await connection('projects')
            .select('*')
            .where('id', id)
            .first();

        return res.status(200).json(projectUpdated);
    },

    async delete(req, res) {
        const { id } = req.params;

        try {

            const project = await connection('projects')
                .select()
                .from('projects')
                .where('id', id)
                .first();

            if (!project) {
                return res.status(400).json({ error: 'Projeto não encontrado!' });
            }

            await connection('projects').where('id', id).del();

            return res.status(200).json({ message: 'Projeto deletado.' });
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}