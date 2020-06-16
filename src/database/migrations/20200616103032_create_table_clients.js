exports.up = function(knex) {
    return knex.schema.createTable('clients', function(table) {
        table.increments();
        table.string('name').notNullable();
        table.string('cnpj').unique().notNullable();
        table.string('email').notNullable();
        table.string('phone').notNullable();
        table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
        table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('clients');
};