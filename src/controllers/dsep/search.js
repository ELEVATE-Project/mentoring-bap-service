'use strict'
const crypto = require('crypto')
const { contextBuilder } = require('@utils/contextBuilder')
const { searchMentorMessageDTO } = require('@dtos/searchMentorMessage')
const { searchSessionMessageDTO } = require('@dtos/searchSessionMessage')
const { requestBodyDTO } = require('@dtos/requestBody')
const { externalRequests } = require('@helpers/requests')
const { bppQueries } = require('@database/queries-psql/bpp')
const { catalogService } = require('@services/catalog')
const { searchItemListGenerator } = require('@helpers/searchItemListGenerator')
const { internalRequests } = require('@helpers/requests')

exports.search = async (req, res) => {
	try {
		const failedRes = (message) => res.status(400).json({ status: false, message })
		const { mentorName, sessionTitle, type } = req.body
		const transactionId = crypto.randomUUID()
		const messageId = crypto.randomUUID()
		const isMentorSearch = mentorName && !sessionTitle
		const isSessionSearch = sessionTitle && !mentorName

		const context = await contextBuilder(transactionId, messageId, process.env.SEARCH_ACTION)
		const message = isMentorSearch ? searchMentorMessageDTO(mentorName) : searchSessionMessageDTO(sessionTitle)
		const sessions = await internalRequests.catalogPOST({
            route: process.env.BAP_CATALOG_SEARCH_SESSIONS_ROUTE,
            body: { filters: req.body },
        })
        const sessionSources = sessions?sessions.map((session) => session._source):[]
        /* console.log('SESSIONS: ', sessions)
        console.log('SESSION COUNT FROM ES:', sessions.length) */
        if (sessions && sessions.length >= process.env.BAP_MINIMUM_SESSION_COUNT_REQUIRED) {
            const listName = type === 'session' ? 'sessions' : 'mentors'
            const items = await searchItemListGenerator(transactionId, type, sessionSources)

            res.status(200).json({
				status: true,
				message: 'Search Success',
				data: {
					count: items.length,
					[listName]: items,
				},
			})
		} else {
			if (!isMentorSearch && !isSessionSearch) return failedRes('Either mentor or session name must be provided')
			if (isMentorSearch && isSessionSearch)
				return failedRes("Hybrid searching using both mentor and session names isn't currently supported")
			const searchRequestBody = requestBodyDTO(context, message)
			await externalRequests.dsepPOST({
				baseURL: process.env.BECKN_BG_URI,
				body: searchRequestBody,
				route: process.env.SEARCH_ROUTE,
			})

			setTimeout(async () => {
				try {
					const listName = type === 'session' ? 'sessions' : 'mentors'
					const items = await searchItemListGenerator(transactionId, type)

					res.status(200).json({
						status: true,
						message: 'Search Success',
						data: {
							count: items.length,
							[listName]: items,
						},
					})
				} catch (err) {
					console.log(err)
					return failedRes('Something Went Wrong')
				}
			}, process.env.SEARCH_MINIMUM_WAIT_TIME)
		}
		const searchRequestBody = requestBodyDTO(context, message)
		await externalRequests.dsepPOST({
			baseURL: process.env.BECKN_BG_URI,
			body: searchRequestBody,
			route: process.env.SEARCH_ROUTE,
		})
	} catch (err) {
		console.error(err)
	}
}

exports.onSearch = async (req, res) => {
	try {
		const context = req.body.context
		const bppUriFromContext = context.bpp_uri
		const bppIdFromContext = context.bpp_id
		const { bpp } = await bppQueries.findOrCreate({
			where: { bppId: bppIdFromContext },
			defaults: { bppUri: bppUriFromContext },
		})
		const transactionId = context.transaction_id
		const bppMongoId = bpp._id
		const providers = req.body.message.catalog.providers
		const isCatalogHandled = await catalogService.catalogHandler(providers, transactionId, bppMongoId)
		res.status(200).json({
			status: true,
			message: 'On_Search Success',
			data: {},
		})
	} catch (err) {
		console.log(err)
	}
}
