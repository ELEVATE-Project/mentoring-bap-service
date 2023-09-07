'use strict'
const { externalPOSTRequest, internalPOSTRequest, internalGETRequest } = require('@utils/requester')

exports.externalRequests = {
	dsepPOST: externalPOSTRequest(),
}

exports.internalRequests = {
	/* recommendationPOST: internalPOSTRequest(process.env.RECOMMENDATION_URI),
	recommendationGET: internalGETRequest(process.env.RECOMMENDATION_URI), */
	catalogPOST: internalPOSTRequest(process.env.BAP_CATALOG_URI),
	catalogGET: internalGETRequest(process.env.BAP_CATALOG_URI),
}
