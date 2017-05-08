var express = require('express')
var router = express.Router()
var knex = require('../db/connection')

// GET ALL BOOKS
router.get('/', (req, res, next) => {
  knex('books')
  .select('*')
 .then(books => {
   res.render('books/index', { books })
 })
})

// GO TO THE ADD NEW BOOK FORM
router.get('/new', (request, response) => {
  response.render('books/new')
})

//SHOW ONE BOOK
router.get('/:id', (req, res, next) => {
  let id = req.params.id

  knex('books')
  .where('id', id)
  .select('*')
  .first()
  .then(book => {
    res.render('books/show', { book })
  })
})

// GRAB A BOOK TO EDIT
router.get('/:id/edit', (req, res, next) => {
  let id = req.params.id

  knex('books')
  .where('id', id)
  .select('*')
  .first()
  .then(book => {
    res.render('books/edit', { book })
  })
})

// CREATE A NEW BOOK
router.post('/', (req, res, next) => {
  let book = {
    title: req.body.title,
    genre: req.body.genre,
    pic_url: req.body.pic_url,
    description: req.body.description
  }

    knex('books')
    .insert(book, '*')
    .then(book => {
      res.redirect('/books')
    })
    .catch(error => {
      res.send(error)
    })
})

// UPDATE AN EXISTING BOOK
router.put('/:id', (req, res, next) => {
  let id = req.params.id

  let book = {
    title: req.body.title,
    genre: req.body.genre,
    pic_url: req.body.pic_url,
    description: req.body.description
  }

  knex('books')
  .update(book, '*')
  .where('id', id)
  .then(book => {
    res.redirect('/books')
  })
  .catch(error => {
    res.send(error)
  })
})

// DELETE A BOOK
router.delete('/:id', (req,res, next) => {
  let id = req.params.id

  knex('books')
  .where('id', id)
  .del()
  .then(book => {
    res.redirect('/books')
  })
  .catch(error => {
    res.send(error)
  })
})

module.exports = router
