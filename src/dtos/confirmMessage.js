'use strict'

exports.confirmMessageDTO = ({ itemId, fulfillmentId, name, phone, email }) => {
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
