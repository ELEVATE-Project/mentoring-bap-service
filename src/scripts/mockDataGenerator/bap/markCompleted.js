'use strict'
const axios = require('axios')

const config = {
	method: 'post',
	maxBodyLength: Infinity,
	headers: {
		'Content-Type': 'application/json',
	},
}

exports.markCompleted = async (authToken, data) => {
	try {
		config.headers['Authorization'] = 'Bearer ' + authToken
		config.url = 'http://localhost:3015/osl-bap/consumer/mark-attendance-completed'
		config.data = JSON.stringify(data)
		const response = await axios(config)
		return response.data.data
	} catch (err) {
		console.log(err)
	}
}

/* {
    "orderId":"6f4484af-8120-442b-8328-f8fa9349ba68",
    "rating":"5"
} */
