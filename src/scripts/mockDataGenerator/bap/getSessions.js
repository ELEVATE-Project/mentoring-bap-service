'use strict'
const axios = require('axios')

const config = {
	method: 'post',
	maxBodyLength: Infinity,
	headers: {
		'Content-Type': 'application/json',
	},
}

exports.getSessions = async (data) => {
	try {
		config.url = 'http://localhost:3015/osl-bap/dsep/search'
		config.data = JSON.stringify(data)
		const response = await axios(config)
		return response.data.data.sessions
	} catch (err) {
		console.log(err)
	}
}

/* exports.getSessions({
	sessionTitle: 'ClusterNumberNo10',
	type: 'session',
})
 */
