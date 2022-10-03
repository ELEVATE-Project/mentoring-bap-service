'use strict'
const { v4: uuidv4 } = require('uuid')
const { faker } = require('@faker-js/faker')

const requestBody = {
	context: {
		domain: process.env.DOMAIN,
		country: process.env.COUNTRY,
		city: process.env.CITY,
		action: 'temp',
		bap_id: process.env.BAP_ID,
		bap_uri: process.env.BAP_URI,
		timestamp: new Date().toISOString(),
		message_id: uuidv4(),
	},
	message: {},
}

exports.requestBodyGenerator = (api, body, transactionId, messageId) => {
	requestBody.context.transaction_id = transactionId
	requestBody.context.message_id = messageId
	if (api === 'bg_search') {
		requestBody.context.action = 'search'
		requestBody.message = {
			intent: {
				descriptor: {
					name: body.keyword,
				},
				item: { descriptor: { name: body.keyword } },
			},
		}
	} else if (api === 'bpp_init') {
		requestBody.context.action = 'init'
		requestBody.message = {
			order: {
				id: uuidv4(),
				items: [{ id: body.itemId }],
				fulfillments: [{ id: body.fulfillmentId }],
				billing: {
					name: faker.name.fullName(),
					phone: faker.phone.phoneNumber(),
					email: faker.internet.email(),
					time: {
						timezone: 'IST',
					},
				},
			},
		}
	} else if (api === 'bpp_cancel') {
		requestBody.context.action = 'cancel'
		requestBody.message = {
			order: {
				id: body.orderId,
			},
			cancellation_reason_id: 1,
			descriptor: {
				name: 'Because this course is too lengthy',
			},
		}
	}
	return requestBody
}
