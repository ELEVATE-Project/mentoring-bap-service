/**
 * name : index.js.
 * author : Aman Karki.
 * created-date : 17-Dec-2021.
 * Description : Health check Root file.
 */

 let healthCheckService = require('./health-check')

 module.exports = function (app) {
     app.get('/healthCheckStatus', healthCheckService.healthCheckStatus)
     app.get('/health', healthCheckService.health_check)
 }
 