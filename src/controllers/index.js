'use strict'
const requester = require('@utils/requester')
const { requestBodyGenerator } = require('@utils/requestBodyGenerator')
const { cacheSave, cacheGet, getKeys } = require('@utils/redis')
const { v4: uuidv4 } = require('uuid')

exports.search = async (req, res) => {
	try {
		const transactionId = uuidv4()
		const messageId = uuidv4()
		await requester.postRequest(
			process.env.BECKN_BG_URI + '/search',
			{},
			requestBodyGenerator('bg_search', { keyword: req.query.keyword }, transactionId, messageId)
		)
		setTimeout(async () => {
			const data = await cacheGet(`${transactionId}:${messageId}:ON_SEARCH`)
			if (!data) res.status(403).send({ message: 'No data Found' })
			else res.status(200).send({ data: data })
		}, 3000)
	} catch (err) {
		console.log(err)
		res.status(400).send({ status: false })
	}
}

exports.onSearch = async (req, res) => {
	try {
		const transactionId = req.body.context.transaction_id
		const messageId = req.body.context.message_id
		const data = await cacheGet(`${transactionId}:${messageId}:ON_SEARCH`)
		if (data) {
			data.push(req.body)
			await cacheSave(`${transactionId}:${messageId}:ON_SEARCH`, data)
		} else await cacheSave(`${transactionId}:${messageId}:ON_SEARCH`, [req.body])
		res.status(200).json({ status: true, message: 'BAP Received Data From BPP' })
	} catch (err) {}
}

exports.init = async (req, res) => {
	try {
		const transactionId = req.body.transaction_id
		const messageId = uuidv4()
		const bppUri = req.body.bppUri
		const itemId = req.body.itemId
		const fulfillmentId = req.body.fulfillmentId
		await requester.postRequest(
			bppUri + '/init',
			{},
			requestBodyGenerator('bpp_init', { itemId, fulfillmentId }, transactionId, messageId)
		)
		setTimeout(async () => {
			const data = await cacheGet(`${transactionId}:${messageId}:ON_INIT`)
			if (!data) res.status(403).send({ message: 'No data Found' })
			else res.status(200).send({ data: data })
		}, 1000)
	} catch (err) {
		console.log(err)
		res.status(400).send({ status: false })
	}
}

exports.onInit = async (req, res) => {
	try {
		const transactionId = req.body.context.transaction_id
		const messageId = req.body.context.message_id
		await cacheSave(`${transactionId}:${messageId}:ON_INIT`, req.body)
		res.status(200).json({ status: true, message: 'BAP Received INIT From BPP' })
	} catch (err) {}
}

exports.confirm = async (req, res) => {
	try {
		const transactionId = req.body.transaction_id
		const messageId = uuidv4()
		const bppUri = req.body.bppUri
		const itemId = req.body.itemId
		const fulfillmentId = req.body.fulfillmentId
		await requester.postRequest(
			bppUri + '/confirm',
			{},
			requestBodyGenerator('bpp_init', { itemId, fulfillmentId }, transactionId, messageId)
		)
		setTimeout(async () => {
			const data = await cacheGet(`${transactionId}:${messageId}:ON_CONFIRM`)
			if (!data) res.status(403).send({ message: 'No data Found' })
			else {
				res.status(200).send({ data: data })
				console.log(`CONFIRM: ${bppUri}:${itemId}:ENROLLED`)
				await cacheSave(`${bppUri}:${itemId}:ENROLLED`, true)
			}
		}, 1000)
	} catch (err) {
		console.log(err)
		res.status(400).send({ status: false })
	}
}

exports.onConfirm = async (req, res) => {
	try {
		const transactionId = req.body.context.transaction_id
		const messageId = req.body.context.message_id
		await cacheSave(`${transactionId}:${messageId}:ON_CONFIRM`, req.body)
		res.status(200).json({ status: true, message: 'BAP Received CONFIRM From BPP' })
	} catch (err) {}
}

exports.cancel = async (req, res) => {
	try {
		const transactionId = req.body.transaction_id
		const messageId = uuidv4()
		const bppUri = req.body.bppUri
		const orderId = req.body.orderId
		const cancellation_reason_id = 1
		const itemId = req.body.itemId
		await requester.postRequest(
			bppUri + '/cancel',
			{},
			requestBodyGenerator('bpp_cancel', { orderId, cancellation_reason_id }, transactionId, messageId)
		)
		setTimeout(async () => {
			const data = await cacheGet(`${transactionId}:${messageId}:ON_CANCEL`)
			if (!data) res.status(403).send({ message: 'No data Found' })
			else {
				res.status(200).send({ data: data })
				console.log(`CANCEL: ${bppUri}:${itemId}:ENROLLED`)
				await cacheSave(`${bppUri}:${itemId}:ENROLLED`, false)
			}
		}, 1000)
	} catch (err) {
		console.log(err)
		res.status(400).send({ status: false })
	}
}

exports.onCancel = async (req, res) => {
	try {
		const transactionId = req.body.context.transaction_id
		const messageId = req.body.context.message_id
		await cacheSave(`${transactionId}:${messageId}:ON_CANCEL`, req.body)
		res.status(200).json({ status: true, message: 'BAP Received CANCELLATION From BPP' })
	} catch (err) {}
}

exports.status = async (req, res) => {
	try {
		const transactionId = req.body.transaction_id
		const messageId = uuidv4()
		const bppUri = req.body.bppUri
		const orderId = req.body.orderId
		await requester.postRequest(
			bppUri + '/status',
			{},
			requestBodyGenerator('bpp_status', { orderId }, transactionId, messageId)
		)
		setTimeout(async () => {
			const data = await cacheGet(`${transactionId}:${messageId}:ON_STATUS`)
			if (!data) res.status(403).send({ message: 'No data Found' })
			else res.status(200).send({ data: data })
		}, 1000)
	} catch (err) {
		console.log(err)
		res.status(400).send({ status: false })
	}
}

exports.onStatus = async (req, res) => {
	try {
		const transactionId = req.body.context.transaction_id
		const messageId = req.body.context.message_id
		await cacheSave(`${transactionId}:${messageId}:ON_STATUS`, req.body)
		res.status(200).json({ status: true, message: 'BAP Received STATUS From BPP' })
	} catch (err) {}
}

exports.userEnrollmentStatus = async (req, res) => {
	try {
		const bppUri = req.body.bppUri
		const itemId = req.body.itemId
		res.status(200).send({ isEnrolled: (await cacheGet(`${bppUri}:${itemId}:ENROLLED`)) ? true : false })
	} catch (err) {}
}

exports.enrolledSessions = async (req, res) => {
	try {
		const enrollmentStatues = await getKeys('*:*:ENROLLED')
		let collector = {}
		await Promise.all(
			enrollmentStatues.map(async (key) => {
				const parts = key.split(':')
				let itemId
				let bppUri
				if (parts.length === 5) {
					bppUri = [parts[0], parts[1], parts[2]].join(':')
					itemId = parts[3]
				} else {
					bppUri = [parts[0], parts[1]].join(':')
					itemId = parts[2]
				}
				const isEnrolled = await cacheGet(key)
				if (isEnrolled) {
					//Probably Not Thread Safe
					if (!collector[bppUri]) collector[bppUri] = [itemId]
					else collector[bppUri].push(itemId)
				}
			})
		)
		res.status(200).send(collector)
	} catch (err) {
		console
	}
}
