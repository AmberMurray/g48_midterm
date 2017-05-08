
'use strict'

exports.up = function(knex) {
  return knex.schema.createTable('authors_and_books', (table) => {
    table.increments()
    table.integer('book_id').notNullable().references('id').inTable('books').onDelete('CASCADE')
    table.integer('author_id').notNullable().references('id').inTable('authors').onDelete('CASCADE')
    table.timestamps(true, true)
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('authors_and_books')
}
