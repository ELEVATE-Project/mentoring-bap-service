'use strict'
const { verifyHeader } = require('@utils/auth')

const unauthenticatedResponse = (message, res) => {
	res.status(401).json({
		message: {
			ack: {
				status: 'NACK',
			},
		},
		error: {
			message,
		},
	})
}

exports.authVerifier = async (req, res, next) => {
	try {
		const authHeader = req.headers['authorization'] || false
		const proxyHeader = req.headers['proxy-authorization'] || false
		const authEnabled = process.env.AUTH_ENABLED === 'true' ? true : false
		if (authEnabled) {
			let proxyVerified = false
			if (!authHeader) return unauthenticatedResponse('Authentication Failed', res)
			if (req.body.context.action === 'search') {
				if (proxyHeader) proxyVerified = await verifyHeader(proxyHeader, req, res)
				else return unauthenticatedResponse('Proxy Authentication Failed', res)
			} else proxyVerified = true
			let authVerified = await verifyHeader(authHeader, req, res)
			if (authVerified && proxyVerified) {
				console.log('AUTHENTICATED')
				next()
			} else {
				console.log('AUTH FAILED')
				return unauthenticatedResponse('Authentication Failed', res)
			}
		} else next()
	} catch (err) {
		console.log(err)
	}
}
