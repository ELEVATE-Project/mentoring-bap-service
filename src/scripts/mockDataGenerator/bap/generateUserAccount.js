'use strict'
const axios = require('axios')

const config = {
	method: 'post',
	maxBodyLength: Infinity,
	headers: {
		'Content-Type': 'application/json',
	},
}

exports.signup = async (data) => {
	try {
		config.url = 'http://localhost:3015/osl-bap/user/signup'
		config.data = JSON.stringify(data)
		const response = await axios(config)
		return response.data.data
	} catch (err) {
		console.log(err)
	}
}

/* {
    "email":"jerome@tunerlabs.com",
    "password":"testpassword"


    {
    email: 'Testaccount@gmail.com',
    accessToken: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2M2Y5ZTRkZWE2NzBjYmRlYjQ3NzY5OTQiLCJpYXQiOjE2NzczMjE0MzgsImV4cCI6MTY3NzQwNzgzOH0.qk2pqkpTNkmM5Qo2CAZR0iK_utJY6heYGVKLiR0l1J_6RcArfyFripyBylQwr3fTfjqJ5fsNUVqf5u7menNQy05EhvwFjt9RTFWnMpcJ_lrVgiJHsrTgY981xBIWc-7SPKyTqADPprC2YtKFPuNxS9LK-u0OqPNgeRxI8fW5OGAIiFWo-w_yPx3P4AEfCudgNAkTEJ5Md80vanP03X2sggUOiLi0mMaOhW8luwz7Ofs2PBHqPwaq14WWYEWpjrkLTCD4cZGSm0ru2bb-dnhGFYr8B70E4mic3Zd4nQbdWijmmzSR4wKyNA7H-voRDS-6VL-IjyhImdFTwgLDiBR-TA',
    expiresIn: '1D'
  }
} */

exports.addProfile = async (authToken, data) => {
	try {
		config.headers['Authorization'] = 'Bearer ' + authToken
		config.url = 'http://localhost:3015/osl-bap/user/profile/add'
		config.data = JSON.stringify(data)
		const response = await axios(config)
		return response.data.data
	} catch (err) {
		console.log(err)
	}
}

/* {
    "name":"Joel",
    "phone":"9895485555"
} */
