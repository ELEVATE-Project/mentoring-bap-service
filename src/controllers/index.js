'use strict'
const requester = require('@utils/requester')
const { requestBodyGenerator } = require('@utils/requestBodyGenerator')
const { cacheSave, cacheGet } = require('@utils/redis')
const { v4: uuidv4 } = require('uuid')

exports.search = async (req, res) => {
	try {
		const transactionId = uuidv4()
		await requester.postRequest(
			process.env.BECKN_BG_URI + '/search',
			{},
			requestBodyGenerator('bg_search', { keyword: req.query.keyword }, transactionId)
		)
		setTimeout(async () => {
			const data = await cacheGet(transactionId)
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
		const data = await cacheGet(transactionId)
		if (data) {
			data.push(req.body)
			await cacheSave(transactionId, data)
		} else await cacheSave(transactionId, [req.body])
		res.status(200).json({ status: true, message: 'BAP Received Data From BPP' })
	} catch (err) {}
}
