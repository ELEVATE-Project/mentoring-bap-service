'use strict'
const axios = require('axios')
const { isEmpty } = require('@utils/generic')
const { compile } = require('path-to-regexp')
/* const https = require('https')
const httpsAgent = new https.Agent({ rejectUnauthorized: false }) */

exports.postRequest = async (baseURL, route, headers = {}, body) => {
	try {
		baseURL = baseURL.replace(/\/$/, '')
		let url = baseURL + route
		const response = await axios.post(url, body, { headers, timeout: 3000 })
		return response.data
	} catch (err) {
		if (err.response) {
			console.log('Response Data: ', err.response.data)
			console.log('Response Status:', err.response.status)
			console.log('Response Headers', err.response.headers)
		} else if (err.request) console.log(err.request)
		else console.log('Error: ', err.message)
		console.log('Request CONFIG: ', err.config)
	}
}

exports.getRequest = async (baseURL, route, headers = {}, pathParams = {}, queryParams = {}) => {
	try {
		route = compile(route, { encode: encodeURIComponent })(pathParams)
		let url = baseURL + route
		if (!isEmpty(queryParams)) url += '?' + new URLSearchParams(queryParams).toString()
		const response = await axios.get(url, { headers })
		return response.data
	} catch (err) {
		if (err.response) {
			console.log('Response Data: ', err.response.data)
			console.log('Response Status:', err.response.status)
			console.log('Response Headers', err.response.headers)
		} else if (err.request) console.log(err.request)
		else console.log('Error: ', err.message)
		console.log('Request CONFIG: ', err.config)
	}
}

exports.externalPOSTRequest = () => {
	return async ({ baseURL, headers, body, route }) => await exports.postRequest(baseURL, route, headers, body)
}

exports.internalPOSTRequest = (baseURL) => {
	return async ({ headers, body, route }) => await exports.postRequest(baseURL, route, headers, body)
}

exports.internalGETRequest = (baseURL) => {
	return async ({ headers, pathParams, queryParams, route }) =>
		await exports.getRequest(baseURL, route, headers, pathParams, queryParams)
}
