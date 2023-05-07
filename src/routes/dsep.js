'use strict'
const router = require('express').Router()
const searchController = require('@controllers/dsep/search')
const selectController = require('@controllers/dsep/select')
const initController = require('@controllers/dsep/init')
const confirmController = require('@controllers/dsep/confirm')
const { tokenVerifier } = require('@middlewares/tokenVerifier')

router.post('/on_search', searchController.onSearch)
router.post('/on_select', selectController.onSelect)
router.post('/on_init', initController.onInit)
router.post('/on_confirm', confirmController.onConfirm)
router.post('/search', searchController.search)
router.post('/select', selectController.select)

router.use(tokenVerifier)
router.post('/init', initController.init)
router.post('/confirm', confirmController.confirm)

module.exports = router
