'use strict'
const requester = require('@utils/requester')
const { requestBodyGenerator } = require('@utils/requestBodyGenerator')
const { cacheSave, cacheGet } = require('@utils/redis')
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
		console.log('BAP ONSEARCH')
		console.log(req.body)
		const transactionId = req.body.context.transaction_id
		const messageId = req.body.context.message_id
		console.log(transactionId)
		console.log(messageId)
		const data = await cacheGet(transactionId)
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
		console.log(req.body)
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
			else res.status(200).send({ data: data })
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
