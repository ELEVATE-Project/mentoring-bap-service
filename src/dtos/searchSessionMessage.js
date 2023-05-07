'use strict'

exports.searchSessionMessageDTO = (sessionName) => {
	return {
		intent: {
			item: {
				descriptor: {
					name: sessionName,
				},
			},
		},
	}
}
