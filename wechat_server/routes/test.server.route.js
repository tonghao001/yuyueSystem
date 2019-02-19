/**
 * Created by elinaguo on 15/12/14.
 */
'use strict';

var testController = require('../controllers/test');

module.exports = function (app) {
  app.route('/test/pay').post(testController.testPay);
};
