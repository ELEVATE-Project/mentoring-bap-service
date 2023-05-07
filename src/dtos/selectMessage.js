'use strict'

exports.selectMessageDTO = (itemId) => {
	return {
		order: {
			item: {
				id: itemId,
			},
		},
	}
}
