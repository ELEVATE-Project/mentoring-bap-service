'use strict'
const axios = require('axios')

const config = {
	method: 'post',
	maxBodyLength: Infinity,
	headers: {
		'Content-Type': 'application/json',
	},
}

exports.confirmSession = async (authToken, data) => {
	try {
		config.headers['Authorization'] = 'Bearer ' + authToken
		config.url = 'http://localhost:3015/osl-bap/dsep/confirm'
		config.data = JSON.stringify(data)
		const response = await axios(config)
		return response.data.data
	} catch (err) {
		console.log(err)
	}
}

/* {
    "itemId":"63f1ec1e23df082856936529",
    "fulfillmentId":"e45e438f-ff95-4ce5-a3f9-93037b5dbc30",
    "type":"mentor"
} */
