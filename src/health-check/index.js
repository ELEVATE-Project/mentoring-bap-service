/**
 * name : index.js.
 * author : Aman Karki.
 * created-date : 17-Dec-2021.
 * Description : Health check Root file.
 */

 let healthCheckService = require('./health-check')

 module.exports = function (app) {
     app.get('/bap-demo/healthCheckStatus', healthCheckService.healthCheckStatus)
     app.get('/bap-demo/health', healthCheckService.health_check)
 }
 