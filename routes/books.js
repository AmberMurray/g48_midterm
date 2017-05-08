var express = require('express')
var router = express.Router()
var knex = require('../db/connection')

// GET ALL books
router.get('/', (req, res, next) => {
  knex('books')
  .select('title', 'genre', 'description', 'pic_url')
 .then(books => {
   res.render('books/index', { books })
 })
})


module.exports = router
