exports.up = function(knex) {
    return knex.schema.createTable('sales', function(table) {
        table.increments();
        table.integer('client_id').notNullable().unsigned();
        table.integer('project_id').notNullable().unsigned();
        table.integer('hours_sold').notNullable();
        table.decimal('value').notNullable();
        table.integer('additional_sales').unsigned();
        table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
        table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
        table.foreign('client_id').references('id').inTable('clients');
        table.foreign('project_id').references('id').inTable('projects');
        table.foreign('additional_sales').references('id').inTable('sales');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('sales');
};