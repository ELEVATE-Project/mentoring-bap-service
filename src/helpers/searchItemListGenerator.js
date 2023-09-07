'use strict'
const { cacheGet } = require('@utils/redis')
const rfdc = require('rfdc')()
const { internalRequests } = require('@helpers/requests')

exports.searchItemListGenerator = async (transactionId, type, fetchedItems) => {
	try {
		let items
		if (!fetchedItems) {
			const itemList = await cacheGet(`SESSION_LIST:${transactionId}`)
			items = await Promise.all(
				itemList.map(async (itemId) => {
					const item = await internalRequests.catalogGET({
						route: process.env.BAP_CATALOG_GET_SESSION_ROUTE,
						pathParams: { sessionId: itemId },
					})
					return item._source
				})
			)
		} else items = fetchedItems
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
