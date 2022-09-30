'use strict'
const router = require('express').Router()
const bap = require('@controllers/')

router.get('/search', bap.search)
router.post('/on_search', bap.onSearch)

router.post('/init', bap.init)
router.post('/on_init', bap.onInit)

router.post('/confirm', bap.confirm)
router.post('/on_confirm', bap.onConfirm)

module.exports = router
