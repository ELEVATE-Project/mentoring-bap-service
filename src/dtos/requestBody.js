'use strict'

exports.requestBodyDTO = (context, message) => {
	return {
		context,
		message,
	}
}
