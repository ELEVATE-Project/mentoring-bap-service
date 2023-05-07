'use strict'

exports.contextBuilder = async (transactionId, messageId, action, bppId, bppUri) => {
	const context = {
		domain: process.env.DOMAIN,
		action,
		bap_id: process.env.BAP_ID,
		bap_uri: process.env.BAP_URI,
		bpp_id: bppId,
		bpp_uri: bppUri,
		timestamp: new Date(),
		ttl: process.env.BAP_TTL,
		version: process.env.SCHEMA_CORE_VERSION,
		message_id: messageId,
		transaction_id: transactionId,
	}

	const filteredContext = Object.fromEntries(Object.entries(context).filter((entry) => entry[1] !== undefined))
	return filteredContext
}
