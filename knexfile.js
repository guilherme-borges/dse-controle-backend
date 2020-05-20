module.exports = {

    development: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            database: 'dse_controle',
            user: 'root',
            password: ''
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: './src/database/migrations'
        }
    },

    staging: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            database: 'apontamento_horas',
            user: 'root',
            password: ''
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: './src/database/migrations'
        }
    },

    production: {
        client: 'mysql',
        connection: {
            database: 'apontamento_horas',
            user: 'root',
            password: ''
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }

};