'use strict'
const router = require('express').Router()
const consumerController = require('@controllers/consumer')
const { tokenVerifier } = require('@middlewares/tokenVerifier')

router.post('/get-item-page-recommendations', consumerController.getItemPageRecommendations)
router.use(tokenVerifier)
router.get('/get-confirmed-list', consumerController.getConfirmedList)
router.post('/mark-attendance-completed', consumerController.markAttendanceCompleted)
router.post('/get-recommendations', consumerController.getRecommendations)
router.post('/get-profile-page-recommendations', consumerController.getProfilePageRecommendations)

module.exports = router
