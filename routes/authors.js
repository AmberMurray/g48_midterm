var express = require('express')
var router = express.Router()
var knex = require('../db/connection')

// GET ALL BOOKS
router.get('/', (req, res, next) => {
  knex('authors')
  .select('*')
  .then(authors => {
    res.render('authors/index', { authors })
  })
})

// GO TO THE ADD NEW BOOK FORM
router.get('/new', (request, response) => {
  response.render('authors/new')
})

//SHOW ONE BOOK
router.get('/:id', (req, res, next) => {
  let id = req.params.id

  knex('authors')
  .select('*')
  .where('id', id)
  .first()
  .then(authorInfo => {
    knex('authors_and_books')
    .innerJoin('books', 'books.id', 'authors_and_books.book_id')
    .select('*')
    .where('authors_and_books.author_id', authorInfo.id)
    .then(book => {
      let author = {
        id: authorInfo.id,
        first_name: authorInfo.first_name,
        last_name: authorInfo.last_name,
        biography: authorInfo.biography,
        pic_url: authorInfo.pic_url,
        bookArray: book
      }
      res.render('authors/show', { author, book })
    })
  })
})

// GRAB AN AUTHOR TO EDIT
router.get('/:id/edit', (req, res, next) => {
  let id = req.params.id

  knex('authors')
  .where('id', id)
  .select('*')
  .first()
  .then(author => {
    res.render('authors/edit', { author })
  })
})

// CREATE A NEW AUTHOR
router.post('/', (req, res, next) => {
  let author = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    pic_url: req.body.pic_url,
    biography: req.body.biography
  }

  knex('authors')
  .insert(author, '*')
  .then(author => {
    res.redirect('/authors')
  })
  .catch(error => {
    res.send(error)
  })
})

// UPDATE AN EXITING AUTHOR
router.put('/:id', (req, res, next) => {
  let id = req.params.id

  let author = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    pic_url: req.body.pic_url,
    biography: req.body.biography
  }

  knex('authors')
  .update(author, '*')
  .where('id', id)
  .then(author => {
    res.redirect('/authors')
  })
  .catch(error => {
    res.send(error)
  })
})

// DELETE AN AUTHOR
router.delete('/:id', (req,res, next) => {
  let id = req.params.id

  knex('authors')
  .where('id', id)
  .del()
  .then(author => {
    res.redirect('/authors')
  })
  .catch(error => {
    res.send(error)
  })
})

module.exports = router
