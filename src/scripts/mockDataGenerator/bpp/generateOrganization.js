'use strict'
const axios = require('axios')

const config = {
	method: 'post',
	maxBodyLength: Infinity,
	url: 'https://dev.elevate-apis.shikshalokam.org/dsep-user/v1/organisations/create',
	headers: {
		'Content-Type': 'application/json',
	},
}

exports.generateOrganization = async (authToken, data) => {
	try {
		config.headers['X-auth-token'] = 'bearer ' + authToken
		config.data = JSON.stringify(data)
		const response = await axios(config)
		return response.data.result
	} catch (err) {
		console.log(err)
	}
}
/* const authToken =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjYzZjg5Y2E0NjI4MjBmZDllNmJlOWVlOSIsImVtYWlsIjoiam9mZmlubWVudG9yc2V2ZW50ZWVuQHR1bmVybGFicy5jb20iLCJuYW1lIjoiam9mZmluIE1lbnRvciBTZXZlbnRlZW4iLCJpc0FNZW50b3IiOnRydWV9LCJpYXQiOjE2NzcyMzc0MTIsImV4cCI6MTY3NzMyMzgxMn0.5CGcxiAZYiJf0L1wp52Ssea3LNYn-UKzXewMGedupnU'

exports.generateOrganization(authToken, {
	name: 'ShikshalokamTwelve',
	code: 'org12',
	description: 'ShikshalokamTwelveDescription',
})
 */
