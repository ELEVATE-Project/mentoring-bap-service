'use strict'
const router = require('express').Router()
const bap = require('@controllers/')

router.get('/trigger-search', bap.triggerSearch)
router.post('/on_search', bap.onSearch)

module.exports = router
