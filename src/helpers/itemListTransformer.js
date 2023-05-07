'use strict'

const rfdc = require('rfdc')()

const returnDataSetter = (transformedArray, listName) => {
	return {
		count: transformedArray.length,
		[`${listName}`]: transformedArray,
	}
}

exports.itemListTransformer = (items, type) => {
	try {
		if (type === 'session') return returnDataSetter(items, 'sessions')
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
		const transformerItemsArray = Array.from(mentorMap.values())
		return returnDataSetter(transformerItemsArray, 'mentors')
	} catch (err) {
		console.log(err)
	}
}
