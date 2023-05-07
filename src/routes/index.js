'use strict'
const router = require('express').Router()
const dsepRouter = require('@routes/dsep')
const userRouter = require('@routes/user')
const graphRouter = require('@routes/graph')
const consumerRouter = require('@routes/consumer')

router.use('/dsep', dsepRouter)
router.use('/user', userRouter)
router.use('/graph', graphRouter)
router.use('/consumer', consumerRouter)

module.exports = router
