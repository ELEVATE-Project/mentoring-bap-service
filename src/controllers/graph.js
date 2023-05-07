'use strict'
const { internalRequests } = require('@helpers/requests')
const { responses } = require('@helpers/responses')

const recomputeRecommendations = async (req, res) => {
	try {
		const response = await internalRequests.recommendationPOST({
			route: process.env.RECOMMENDATION_TRIGGER_RECOMPUTATION,
		})
		if (response.status) responses.success(res, 'Recommendations Recomputed Successfully')
		else responses.failBad(res, 'Recommendations Recomputation Failed')
	} catch (err) {
		console.log(err)
	}
}

const recomputeContentRecommendations = async (req, res) => {
	try {
		const response = await internalRequests.recommendationPOST({
			route: process.env.RECOMMENDATION_TRIGGER_CONTENT_RECOMPUTATION,
		})
		if (response.status) responses.success(res, 'Recommendations Recomputed Successfully')
		else responses.failBad(res, 'Recommendations Recomputation Failed')
	} catch (err) {
		console.log(err)
	}
}

const recomputePageRank = async (req, res) => {
	try {
		const response = await internalRequests.recommendationPOST({
			route: process.env.RECOMMENDATION_PAGERANK_RECOMPUTATION,
		})
		if (response.status) responses.success(res, 'Recommendations Recomputed Successfully')
		else responses.failBad(res, 'Recommendations Recomputation Failed')
	} catch (err) {
		console.log(err)
	}
}

const setUniqueConstraints = async (req, res) => {
	try {
		const response = await internalRequests.recommendationPOST({
			route: process.env.RECOMMENDATION_SET_UNIQUE_CONSTRAINTS,
		})
		if (response.status) responses.success(res, 'Setting Unique Constraints Successful')
		else responses.failBad(res, 'Setting Unique Constraints Failed')
	} catch (err) {
		console.log(err)
	}
}

const triggerAutoSearch = async (req, res) => {
	try {
		const command = req.query.command
		const response = await internalRequests.recommendationGET({
			queryParams: {
				command,
			},
			route: process.env.RECOMMENDATION_TRIGGER_AUTO_SEARCH,
		})
		if (response.status) responses.success(res, 'Auto Search Trigger Successful')
		else responses.failBad(res, 'Something Went Wrong')
	} catch (err) {
		console.log(err)
	}
}

const deleteAllNodes = async (req, res) => {
	try {
		const response = await internalRequests.recommendationGET({
			route: process.env.RECOMMENDATION_DELETE_ALL_NODES,
		})
		if (response.status) responses.success(res, 'All Nodes Deleted')
		else responses.failBad(res, 'Something Went Wrong')
	} catch (err) {
		console.log(err)
	}
}

const graphController = {
	recomputeRecommendations,
	setUniqueConstraints,
	recomputeContentRecommendations,
	recomputePageRank,
	triggerAutoSearch,
	deleteAllNodes,
}

module.exports = graphController
