'use strict'
const authentication = require('@utils/authentication')

exports.tokenVerifier = async (req, res, next) => {
	const verificationFailedRes = () =>
		res.status(401).json({ status: false, message: 'Access Token Verification Failed' })
	try {
		const accessToken = req.headers.authorization
		if (!accessToken) return verificationFailedRes()
		const tokenParts = accessToken.split(' ')
		if (tokenParts[0] !== 'Bearer') throw 'Not a bearer token'
		const payload = await authentication.verifyAccessToken(tokenParts[1])
		if (payload) {
			req.user = {
				id: payload.sub,
			}
		} else return verificationFailedRes()
		next()
	} catch (err) {
		console.log('TOKEN VERIFIER ERROR: ', err)
		return verificationFailedRes()
	}
}
