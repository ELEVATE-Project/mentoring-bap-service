'use strict'
const axios = require('axios')
const qs = require('qs')

const config = {
	method: 'post',
	maxBodyLength: Infinity,
	headers: {
		'Content-Type': 'application/json',
	},
}

exports.generateMentorAccount = async (data) => {
	try {
		config.url = 'https://dev.elevate-apis.shikshalokam.org/dsep-user/v1/account/create'
		config.headers['Content-Type'] = 'application/json'
		config.data = JSON.stringify(data)
		const response = await axios(config)
		return response.data.result
	} catch (err) {
		console.log(JSON.stringify(err, null, 4))
	}
}

exports.loginMentorAccount = async (data) => {
	try {
		config.url = 'https://dev.elevate-apis.shikshalokam.org/dsep-user/v1/account/login'
		config.data = qs.stringify(data)
		config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
		const response = await axios(config)
		return response.data.result
	} catch (err) {
		console.log(err)
	}
}
