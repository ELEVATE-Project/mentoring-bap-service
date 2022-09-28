'use strict'
const router = require('express').Router()
const bap = require('@controllers/')

router.get('/search', bap.search)
router.post('/on_search', bap.onSearch)

module.exports = router
