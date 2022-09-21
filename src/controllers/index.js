'use strict'
const requester = require('@utils/requester')
const { requestBodyGenerator } = require('@utils/requestBodyGenerator')

exports.triggerSearch = async (req, res) => {
	try {
		const response = await requester.postRequest(
			process.env.BECKN_BG_URI + '/search',
			{},
			requestBodyGenerator('bg_search', { keyword: req.query.keyword })
		)
		res.status(200).send(response.data)
	} catch (err) {
		console.log(err)
		res.status(400).send({ status: false })
	}
}

exports.onSearch = async (req, res) => {
	try {
		console.debug(JSON.stringify(req.body, null, '\t'))
		res.status(200).json({ status: true, message: 'BAP Received Data From BPP' })
	} catch (err) {}
}
