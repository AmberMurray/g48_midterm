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

// //edit a message
// router.get('/:id/edit', (req, res, next) => {
//   let id = req.params.id
//
//   db('messages')
//   .where('id', id)
//   .select('*')
//   .first()
//   .then(message => {
//     res.render('edit', { message })
//   })
// })

// //create a new message
// router.post('/', (req, res, next) => {
//   let newMsg = {
//     name: req.body.name,
//     message: req.body.message
//   }
//
//   // check to see if a name has even been passed to you
//   if (!(newMsg.name)) {
//     res.render('new', { error: 'Please include your name' })
//   } else {
//     db('messages')
//     .insert(newMsg, '*')
//     .then(message => {
//       res.redirect('/')
//     })
//     .catch(error => {
//       res.send(error)
//     })
//   }
// })
//
// //update an existing message
// router.put('/:id', (req, res, next) => {
//   let id = req.params.id
//
//   let message = {
//     name: req.body.name,
//     message: req.body.message
//   }
//
//   db('messages')
//   .update(message, '*')
//   .where('id', id)
//   .then(message => {
//     res.redirect('/')
//   })
//   .catch(error => {
//     res.send(error)
//   })
// })
//
// //delete a message
// router.delete('/:id', (req,res, next) => {
//   db('messages')
//   .where('id', req.params.id)
//   .del()
//   .then(message => {
//     res.redirect('/')
//   })
//   .catch(error => {
//     res.send(error)
//   })
// })

module.exports = router
