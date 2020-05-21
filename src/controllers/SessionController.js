const connection = require('../database/connection');

module.exports = {
    async create(req, res) {

        const { username, password } = req.body;

        const user = await connection('users')
            .select()
            .from('users')
            .where('username', username)
            .first();

        if (!user) {
            return res.status(401).json({ error: 'Nome de usuário ou senha inválido.' });
        }

        if (password != user.password) {
            return res.status(401).json({ error: 'Nome de usuário ou senha inválido.' });
        }

        return res.status(200).json(user);
    }
}