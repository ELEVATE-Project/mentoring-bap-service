/**
 * name : mongodb.js.
 * author : Aman Karki.
 * created-date : 17--2021.
 * Description : Mongodb health check.
 */

// Dependencies
const mongoose = require('mongoose')

async function health_check() {
	
    let status =true;
    const db = await mongoose.createConnection(process.env.MONGODB_URL, {
        useNewUrlParser: true,
    })

	await db.on('error', function () {
        console.log("error");
		status =  false
	})

	await db.once('open', function () {
       status = true
	});
    return status;
    
}

module.exports = {
	health_check: health_check,
}
