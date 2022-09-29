'use strict'
const redis = require('redis')
const client = redis.createClient({
	url: process.env.REDIS_HOST,
})

client.on('error', (err) => console.log('Redis Client Error: ', err))
client.on('ready', () => console.log('Redis Client Connected'))
client.connect()

exports.cacheGet = async (key) => {
	const data = await client.get(key)
	if (data) return JSON.parse(data)
	else return null
}

exports.cacheSave = async (key, data) => {
	await client.setEx(key, 60 * 60, JSON.stringify(data))
}
