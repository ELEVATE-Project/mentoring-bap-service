import _sodium, { base64_variants } from 'libsodium-wrappers'

export const createAuthHeaderConfig = async (request) => {
	const header = await createAuthorizationHeader(request)
	const axios_config = {
		headers: {
			authorization: header,
		},
		timeout: getConfig().app.httpTimeout,
	}
	return axios_config
}

export const createAuthorizationHeader = async (message: any) => {
	const { signing_string, expires, created } = await createSigningString(JSON.stringify(message))
	const signature = await signMessage(signing_string, getConfig().app.privateKey || '')
	const subscriber_id = getConfig().app.subscriberId
	const header = `Signature keyId="${subscriber_id}|${
		getConfig().app.uniqueKey
	}|ed25519",algorithm="ed25519",created="${created}",expires="${expires}",headers="(created) (expires) digest",signature="${signature}"`
	return header
}

export const createSigningString = async (message, created, expires) => {
	if (!created) created = Math.floor(new Date().getTime() / 1000 - 1 * 60).toString()
	if (!expires) expires = (parseInt(created) + 1 * 60 * 60).toString()
	await _sodium.ready
	const sodium = _sodium
	const digest = sodium.crypto_generichash(64, sodium.from_string(message))
	const digest_base64 = sodium.to_base64(digest, base64_variants.ORIGINAL)
	const signing_string = `(created): ${created}
  (expires): ${expires}
  digest: BLAKE-512=${digest_base64}`
	return { signing_string, expires, created }
}

export const signMessage = async (signing_string, privateKey) => {
	await _sodium.ready
	const sodium = _sodium
	const signedMessage = sodium.crypto_sign_detached(
		signing_string,
		sodium.from_base64(privateKey, base64_variants.ORIGINAL)
	)
	const something = sodium.to_base64(signedMessage, base64_variants.ORIGINAL)
	return something
}
