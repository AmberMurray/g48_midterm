'use strict'

exports.up = function(knex) {
return knex.schema.createTable('books', (table) => {
 table.increments()
 table.string('title').notNullable()
 table.string('genre').notNullable()
 table.text('description').notNullable()
 table.text('pic_url').notNullable()
 table.timestamps(true, true)
})
}

exports.down = function(knex) {
return knex.schema.dropTable('books')
}
