'use strict'

exports.seed = function(knex) {
  return knex('authors_and_books').del()
  .then(() => {
    return knex('authors_and_books').insert([
      {
        id: 1,
        book_id: '1',
        authors_id: '1'
      },
      {
        id: 2,
        book_id: '1',
        authors_id: '5'
      },
      {
        id: 3,
        book_id: '1',
        authors_id: '6'
      },
      {
        id: 4,
        book_id: '2',
        authors_id: '2'
      },
      {
        id: 5,
        book_id: '3',
        authors_id: '3'
      },
      {
        id: 6,
        book_id: '4',
        authors_id: '4'
      },
      {
        id: 7,
        book_id: '5',
        authors_id: '4'
      },
      {
        id: 8,
        book_id: '6',
        authors_id: '4'
      },
    ])
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('authors_and_books_id_seq', (SELECT MAX(id) FROM authors_and_books))"
      )
    })
  }
