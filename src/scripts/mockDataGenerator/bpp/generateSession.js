'use strict'
const axios = require('axios')

const config = {
	method: 'post',
	maxBodyLength: Infinity,
	url: 'https://dev.elevate-apis.shikshalokam.org/dsep-mentoring/v1/sessions/update',
	headers: {
		'Content-Type': 'application/json',
	},
}

exports.generateSession = async (authToken, data) => {
	try {
		config.headers['X-auth-token'] = 'bearer ' + authToken
		config.data = JSON.stringify(data)
		const response = await axios(config)
		return response.data.result
	} catch (err) {
		console.log(err)
	}
}

/* const data = JSON.stringify({
	title: 'Second Provider Management Level Tags Test 2',
	description: 'Second Provider Management Level Tags Test 2',
	startDate: 1676848996,
	endDate: 1676856196,
	recommendedFor: [
		{
			value: 'deo',
			label: 'District education officer',
		},
	],
	categories: [
		{
			value: 'Infrastructure Management',
			label: 'Infrastructure Management',
		},
	],
	medium: [
		{
			label: 'English',
			value: '1',
		},
	],
	timeZone: 'Asia/Calcutta',
	image: ['users/1232s2133sdd1-12e2dasd3123.png'],
}) */
