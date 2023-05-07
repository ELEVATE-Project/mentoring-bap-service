'use strict'
const router = require('express').Router()
const userController = require('@controllers/user')
const { tokenVerifier } = require('@middlewares/tokenVerifier')

router.post('/login', userController.login)
router.post('/signup', userController.signup)
router.post('/get-user-emails', userController.getUserEmails)

router.use(tokenVerifier)
router.post('/profile/add', userController.addProfile)
router.post('/profile/edit', userController.editProfile)

module.exports = router
