'use strict'
const requester = require('@utils/requester')
const { requestBodyGenerator } = require('@utils/requestBodyGenerator')

exports.triggerSearch = async (req, res) => {
	try {
		console.log(req.query.keyword)
		console.log('Trigger Search')
		const response = await requester.postRequest(
			process.env.BECKN_BG_URI + '/search',
			{},
			requestBodyGenerator('bg_search', { keyword: req.query.keyword })
		)
		console.log(response.data)
		res.status(200).json(response.data)
	} catch (err) {
		console.log(err)
		res.status(400).json({ status: false })
	}
}

exports.onSearch = async (req, res) => {
	try {
		console.log('On Search')
		res.status(200).json({ status: true })
	} catch (err) {}
}
