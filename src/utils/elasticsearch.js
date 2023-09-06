'use strict'
const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://elasticsearch:9200' })

client.on('response', (err, result) => {
	if (err) console.log('Elasticsearch Client Error: ', err)
	else console.log('Elasticsearch Operation Successful', result)
})

exports.indexDocument = async (index, id, body) => {
	return await client.index({ index, id, body })
}

exports.getDocumentById = async (index, id) => {
	return await client.get({
		index: index,
		id: id,
	})
}

exports.searchDocuments = async (index, body) => {
	return await client.search({
		index: index,
		body: body,
	})
}

exports.deleteDocument = async (index, type, id) => {
	return await client.delete({
		index: index,
		type: type,
		id: id,
	})
}
