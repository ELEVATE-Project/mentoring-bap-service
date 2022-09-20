'use strict'

exports.triggerSearch = async (req, res) => {
	try {
		console.log('Trigger Search')
		res.status(200).json({ status: true })
	} catch (err) {}
}

exports.onSearch = async (req, res) => {
	try {
		console.log('On Search')
		res.status(200).json({ status: true })
	} catch (err) {}
}
