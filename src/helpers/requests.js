'use strict'
const { externalPOSTRequest, internalPOSTRequest, internalGETRequest } = require('@utils/requester')

exports.externalRequests = {
	dsepPOST: externalPOSTRequest(),
}

exports.internalRequests = {
	recommendationPOST: internalPOSTRequest(process.env.RECOMMENDATION_URI),
	recommendationGET: internalGETRequest(process.env.RECOMMENDATION_URI),
}
