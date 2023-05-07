'use strict'

exports.response = (code, status) => (res, message, data) => res.status(code).json({ status, message, data })
