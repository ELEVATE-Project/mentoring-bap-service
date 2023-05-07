'use strict'

exports.searchMentorMessageDTO = (mentorName) => {
	return {
		intent: {
			agent: {
				person: {
					name: mentorName,
				},
			},
		},
	}
}
