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
	await client.setEx(key, 60 * 60 * 24, JSON.stringify(data))
}

exports.getKeys = async (pattern) => {
	return await client.keys(pattern)
}

const getPubSubClient = async () => {
	const pubSubClient = client.duplicate()
	await pubSubClient.connect()
	return pubSubClient
}

exports.getMessage = async (channelName) => {
	const subscriberClient = await getPubSubClient()
	try {
		return await new Promise((resolve, reject) => {
			try {
				subscriberClient.subscribe(channelName, (message) => {
					resolve(message)
				})
			} catch (err) {
				reject(err)
			}
		})
	} catch (err) {
		console.log('REDIS getMessage:', err)
	} finally {
		await subscriberClient.unsubscribe(channelName)
		await subscriberClient.quit()
	}
}

exports.sendMessage = async (channelName, message) => {
	const publisherClient = await getPubSubClient()
	try {
		await publisherClient.publish(channelName, message)
	} catch (err) {
		console.log('REDIS sendMessage: ', err)
	} finally {
		await publisherClient.unsubscribe(channelName)
		await publisherClient.quit()
	}
}
