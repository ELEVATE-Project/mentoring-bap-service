'use strict'
const crypto = require('crypto')
const path = require('path')
const fs = require('fs')
const jwt = require('jsonwebtoken')

//Private RSA Key For ACCESS TOKEN
const pathToAccessPrivateKey = path.join(__dirname, '..', 'keys/access_rsa_priv.pem')
const accessPrivateKey = fs.readFileSync(pathToAccessPrivateKey, 'utf8')

//Public RSA Key For ACCESS TOKEN
const pathToAccessPublicKey = path.join(__dirname, '..', 'keys/access_rsa_pub.pem')
const accessPublicKey = fs.readFileSync(pathToAccessPublicKey, 'utf8')

exports.generateHashAndSalt = async (password) => {
	try {
		return new Promise((resolve, reject) => {
			const salt = crypto.randomBytes(64).toString('hex')
			crypto.scrypt(password, salt, 64, (err, hash) => {
				if (err) reject(err)
				else resolve({ salt, hash: hash.toString('hex') })
			})
		})
	} catch (err) {
		console.log(err)
	}
}

exports.verifyPassword = async (password, hash, salt) => {
	try {
		return new Promise((resolve, reject) => {
			crypto.scrypt(password, salt, 64, (err, generatedHash) => {
				if (err) reject(err)
				resolve(hash === generatedHash.toString('hex'))
			})
		})
	} catch (err) {
		console.log(err)
	}
}

exports.generateJWTs = async (user) => {
	try {
		const payload = {
			sub: user._id,
		}
		const accessToken = jwt.sign(payload, accessPrivateKey, {
			expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
			algorithm: 'RS256',
		})
		return { accessToken }
	} catch (err) {
		console.log(err)
	}
}

const verifyToken = (publicKey) => async (token) => {
	try {
		if (token.match(/\S+\.\S+\.\S+/) !== null) return jwt.verify(token, publicKey, { algorithms: ['RS256'] })
		else return false
	} catch (err) {
		console.log(err)
		throw err
	}
}

exports.verifyAccessToken = verifyToken(accessPublicKey)
