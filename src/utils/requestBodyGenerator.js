'use strict'
const requestBody = {
	context: {
		domain: process.env.DOMAIN,
		country: process.env.COUNTRY,
		city: process.env.CITY,
		action: 'temp',
	},
	message: {
		intent: {
			descriptor: {
				name: 'string',
			},
		},
	},
}

exports.requestBodyGenerator = (api, body) => {
	if (api === 'bg_search') {
		requestBody.context.action = 'search'
		requestBody.message.intent.descriptor.name = body.keyword
		requestBody.message.intent = {
			...requestBody.message.intent,
			...{ item: { descriptor: { name: body.keyword } } },
		}
	}
	return requestBody
}
