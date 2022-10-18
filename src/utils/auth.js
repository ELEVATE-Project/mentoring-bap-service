'use strict'
const _sodium = require('libsodium-wrappers')
const { base64_variants } = require('libsodium-wrappers')
const { getSubscriberDetails } = require('@utils/lookup')

exports.createAuthorizationHeader = async (message) => {
	const { signingString, expires, created } = await createSigningString(JSON.stringify(message))
	const signature = await signMessage(signingString, process.env.PRIVATE_KEY || '')
	const subscriberId = process.env.SUBSCRIBER_ID
	const header = `Signature keyId="${subscriberId}|${process.env.UNIQUE_ID}|ed25519",algorithm="ed25519",created="${created}",expires="${expires}",headers="(created) (expires) digest",signature="${signature}"`
	return header
}

const createSigningString = async (message, created, expires) => {
	if (!created) created = Math.floor(new Date().getTime() / 1000 - 1 * 60).toString()
	if (!expires) expires = (parseInt(created) + 1 * 60 * 60).toString()
	await _sodium.ready
	const sodium = _sodium
	const digest = sodium.crypto_generichash(64, sodium.from_string(message))
	const digest_base64 = sodium.to_base64(digest, base64_variants.ORIGINAL)
	const signingString = `(created): ${created}
(expires): ${expires}
digest: BLAKE-512=${digest_base64}`
	return { signingString, expires, created }
}

const signMessage = async (signingString, privateKey) => {
	await _sodium.ready
	const sodium = _sodium
	const signedMessage = sodium.crypto_sign_detached(
		signingString,
		sodium.from_base64(privateKey, base64_variants.ORIGINAL)
	)
	return sodium.to_base64(signedMessage, base64_variants.ORIGINAL)
}

exports.verifyHeader = async (header, req) => {
	try {
		const parts = splitHeader(header)
		if (!parts || Object.keys(parts).length === 0) return false
		const subscriberId = parts['keyId'].split('|')[0]
		const uniqueKeyId = parts['keyId'].split('|')[1]
		const subscriberDetails = await getSubscriberDetails(subscriberId, uniqueKeyId)
		const publicKey = subscriberDetails.signing_public_key
		const { signingString } = await createSigningString(
			JSON.stringify(req.body),
			parts['created'],
			parts['expires']
		)
		return await verifyMessage(parts['signature'], signingString, publicKey)
	} catch (error) {
		return false
	}
}

const splitHeader = (header) => {
	header = header.replace('Signature ', '')
	let re = /\s*([^=]+)=([^,]+)[,]?/g
	let m
	let parts = {}
	while ((m = re.exec(header)) !== null) {
		if (m) {
			parts[m[1]] = removeQuotes(m[2])
		}
	}
	return parts
}

const removeQuotes = (value) => {
	if (value.length >= 2 && value.charAt(0) == '"' && value.charAt(value.length - 1) == '"')
		value = value.substring(1, value.length - 1)
	return value
}

const verifyMessage = async (signedString, signingString, publicKey) => {
	try {
		await _sodium.ready
		const sodium = _sodium
		return sodium.crypto_sign_verify_detached(
			sodium.from_base64(signedString, base64_variants.ORIGINAL),
			signingString,
			sodium.from_base64(publicKey, base64_variants.ORIGINAL)
		)
	} catch (error) {
		return false
	}
}
