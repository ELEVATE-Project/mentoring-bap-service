'use strict'
const axios = require('axios')
const https = require('https')
const httpsAgent = new https.Agent({ rejectUnauthorized: false })

exports.postRequest = async (url, headers, body) => {
	return new Promise((resolve, reject) => {
		axios({ method: 'post', url, data: body, headers, httpsAgent })
			.then((res) => {
				resolve(res)
			})
			.catch((error) => {
				console.log(error)
				reject(false)
			})
	})
}
