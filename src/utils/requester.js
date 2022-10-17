'use strict'
const axios = require('axios')
//const https = require('https')
//const httpsAgent = new https.Agent({ rejectUnauthorized: true })

exports.postRequest = async (url, headers, body) => {
	console.log(body)
	return new Promise((resolve, reject) => {
		axios({ method: 'post', url, data: body, headers, timeout: 3000 })
			.then((res) => {
				console.log('RESPONSE: ')
				console.log(res.data)
				resolve(res)
			})
			.catch((error) => {
				console.log('ERROR: ')
				console.log(error.response)
				//console.log(error)
				reject(false)
			})
	})
}
