'use strict'
require('module-alias/register')
require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
require('@configs/')
require('@utils/authentication')

app.use(bodyParser.urlencoded({ extended: true, limit: '50MB' }))
app.use(bodyParser.json({ limit: '50MB' }))
app.use(cors())
app.use('/osl-bap', require('@routes'))

app.listen(process.env.APPLICATION_PORT, (res, err) => {
	if (err) onError(err)
	console.log('Env: ' + process.env.NODE_ENV)
	console.log('OSL BAP PORT:' + process.env.APPLICATION_PORT)
})

const onError = (error) => {
	console.log(error)
}
