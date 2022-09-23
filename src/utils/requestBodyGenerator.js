'use strict'
const requestBody = {
	context: {
		domain: process.env.DOMAIN,
		country: process.env.COUNTRY,
		city: process.env.CITY,
		action: 'temp',
		bap_id: process.env.BAP_ID,
		bap_uri: process.env.BAP_URI,
		timestamp: new Date().toISOString(),
	},
	message: {
		intent: {
			descriptor: {
				name: 'string',
			},
		},
	},
}

exports.requestBodyGenerator = (api, body, transactionId) => {
	if (api === 'bg_search') {
		requestBody.context.action = 'search'
		requestBody.message.intent.descriptor.name = body.keyword
		requestBody.context.transaction_id = transactionId
		requestBody.message.intent = {
			...requestBody.message.intent,
			...{ item: { descriptor: { name: body.keyword } } },
		}
	}
	return requestBody
}
