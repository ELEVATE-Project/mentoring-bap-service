'use strict'

const { response } = require('@utils/response')

const responseCodes = {
	SUCCESS_CREATED: 201,
	SUCCESS: 200,
	FAIL_BAD_REQUEST: 400,
	FAIL_UNAUTHENTICATED: 401,
	FAIL_FORBIDDEN: 403,
	FAIL_NOT_FOUND: 404,
}

exports.responses = {
	success: response(responseCodes.SUCCESS, true),
	successCreated: response(responseCodes.SUCCESS_CREATED, true),
	failBad: response(responseCodes.FAIL_BAD_REQUEST, false),
	failUnauthenticated: response(responseCodes.FAIL_UNAUTHENTICATED, false),
	failForbidden: response(responseCodes.FAIL_FORBIDDEN, false),
	failNotFound: response(responseCodes.FAIL_NOT_FOUND, false),
}
