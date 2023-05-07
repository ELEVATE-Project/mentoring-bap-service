'use strict'

exports.initMessageDTO = ({ itemId, fulfillmentId, name, phone, email }) => {
	return {
		order: {
			items: [{ id: itemId }],
			fulfillments: [{ id: fulfillmentId, customer: { person: { name } } }],
			billing: {
				name,
				phone,
				email,
			},
		},
	}
}
