exports.up = function(knex) {
    return knex.schema.createTable('projects', function(table) {
        table.increments();
        table.string('name').notNullable();
        table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
        table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('projects');
};