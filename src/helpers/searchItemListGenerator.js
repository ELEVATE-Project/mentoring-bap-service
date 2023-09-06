'use strict'
const { cacheGet } = require('@utils/redis')
const rfdc = require('rfdc')()
const { getDocumentById } = require('@utils/elasticsearch')
const { internalRequests } = require('@helpers/requests')

exports.searchItemListGenerator = async (transactionId, type) => {
	try {
		const itemList = await cacheGet(`SESSION_LIST:${transactionId}`)
		// Instead of reading from redis use elasticsearch
		const items = await Promise.all(
			itemList.map(async (itemId) => {
				// return await cacheGet(`SESSION:${itemId}`)
				//return await getDocumentById('item-index', itemId)
				const item = await internalRequests.catalogGET({
					route: process.env.BAP_CATALOG_GET_SESSION_ROUTE,
					pathParams: { sessionId: itemId },
				})
				return item._source
			})
		)
		if (type === 'session') {
			return items
		} else if (type === 'mentor') {
			const mentorMap = new Map()
			items.map((item) => {
				const mentorId = item.mentor.id
				const itemCopy = rfdc(item)
				delete itemCopy.mentor
				const mentor = mentorMap.get(mentorId)
				if (!mentor) mentorMap.set(item.mentor.id, { mentor: item.mentor, slots: [itemCopy] })
				else {
					const slots = mentor.slots
					slots.push(itemCopy)
					mentorMap.set(item.mentor.id, { mentor: item.mentor, slots })
				}
			})
			return Array.from(mentorMap.values())
		}
	} catch (err) {
		console.log(err)
	}
}
