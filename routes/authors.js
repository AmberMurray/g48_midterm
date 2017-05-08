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
  .where('id', id)
  .select('*')
  .first()
  .then(author => {
    res.render('authors/show', { author })
  })
})

//edit a message
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
