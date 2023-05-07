'use strict'
exports.isEmpty = (obj) => {
	for (let i in obj) return false
	return true
}
