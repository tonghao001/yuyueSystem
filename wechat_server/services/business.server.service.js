// /**
//  * Created by elinaguo on 16/1/31.
//  */
// 'use strict';
// var agent = require('superagent').agent();
// var config = require('../../config/config');
// exports.repayThePaymentRecord = function(userId, paymentId, deviceId, callback){
//   console.log('repay payment record==================');
//   console.error('userId', userId);
//   console.error('paymentId', paymentId);
//   console.error('deviceId', deviceId);
//   var url = config.business.serverAddress + config.business.repay;
//   agent.post(url)
//     .set('Content-Type', 'application/x-www-form-urlencoded')
//     .send({
//       user_id: userId,
//       payment_id: paymentId,
//       device_registration_id: deviceId
//     })
//     .end(function (err, res) {
//       return callback(err, res.body);
//     });
// };
