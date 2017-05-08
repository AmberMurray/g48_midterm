'use strict'

exports.seed = function (knex) {
  return knex('authors_and_books').del()
  .then(() => {
    return knex('authors').del()
  }).then(() => {
    return knex('books').del()
  })
}
