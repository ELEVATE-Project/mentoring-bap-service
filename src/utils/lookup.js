'use strict'
const axios = require('axios')

exports.getSubscriberDetails = async (subscriberId, uniqueKeyId) => {
	try {
		const subscribers = await exports.registryLookup({
			subscriber_id: subscriberId,
			unique_key_id: uniqueKeyId,
		})
		if (subscribers.length == 0) {
			throw new Error('No subscriber found')
		}
		return subscribers[0]
	} catch (err) {
		throw new Error('Error in registry lookup')
	}
}

exports.registryLookup = async (lookupParameter) => {
	try {
		const response = await axios.post(process.env.BECKN_REGISTRY_URI + '/lookup', lookupParameter)
		const subscribers = []
		response.data.forEach((data) => {
			try {
				subscribers.push({
					subscriber_id: data.subscriber_id,
					subscriber_url: data.subscriber_url,
					type: data.type,
					signing_public_key: data.signing_public_key,
					valid_until: data.valid_until,
				})
			} catch (error) {
				console.log(data)
				console.log(error)
			}
		})
		return subscribers
	} catch (err) {
		console.log(err)
	}
}
