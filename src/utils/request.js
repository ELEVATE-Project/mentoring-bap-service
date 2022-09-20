'use strict'
const axios = require('axios')

exports.postRequest = async (url, headers, body) => {
	return new Promise((resolve, reject) => {
		axios({ method: 'post', url, data: body, headers })
			.then((res) => {
				resolve(res)
			})
			.catch((error) => {
				console.log(error)
				reject(false)
			})
	})
}
