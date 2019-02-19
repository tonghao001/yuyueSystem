/**
 * Created by elinaguo on 15/10/13.
 */
'use strict';
var crypto = require('crypto'),
  httpManager = require('../supports/http_manager'),
  utf8 = require('utf8'),
  xmlParser = require('xml2json');

var Config = {
  payment_certificate: {"privatekey":"./certification/debug_payment/apiclient_key.pem","certificate":"./certification/debug_payment/apiclient_cert.pem","ca":"./certification/debug_payment/rootca.pem"},
  payment_params: {"privateKey":"1akejiDoujiaollenSocial2016Tfuck","payUrl":"https://api.mch.weixin.qq.com/mmpaymkttransfers/promotion/transfers","mch_appid":"wx416e5d7df03fde74","mchid":"1290696901"}
};

exports.testPay = function(req, res, next){
  req.data = {
    success: true
  };
  return next();
  var paymentInfo = {
    open_id: 'okiSOwq7cRwOEKlUcxj_D-2qUgsY',
    // open_id: 'okiSOwg-tJVI8pUU8d1WfwfmAufU',
    amount: 100,
    spbill_create_ip: '101.228.63.161'
  };
  pay(paymentInfo, function(err, result){
    if(err){
      req.err = err;
      return next();
    }

    req.data = result;
    return next();
  });
};



function generateNewPartnerTradeNo(){
  return (new Date()).valueOf().toString().substring(3,9) + (new Date()).valueOf().toString().substring(8,13) + (new Date()).valueOf().toString();
}
function generateNonceStr(){
  return Math.random().toString(30).substr(2).substr(0,32);
}
function generateSign(options, key){
  var sign = '';
  if(options.amount){
    sign += ('amount=' + options.amount);
  }
  if(options.check_name){
    sign += ('&check_name=' + options.check_name);
  }
  if(options.desc){
    sign += ('&desc=' + options.desc);
  }
  if(options.mch_appid){
    sign += ('&mch_appid=' + options.mch_appid);
  }
  if(options.mchid){
    sign += ('&mchid=' + options.mchid);
  }
  if(options.nonce_str){
    sign += ('&nonce_str=' + options.nonce_str);
  }
  if(options.openid){
    sign += ('&openid=' + options.openid);
  }
  if(options.partner_trade_no){
    sign += ('&partner_trade_no=' + options.partner_trade_no);
  }
  if(options.spbill_create_ip){
    sign += ('&spbill_create_ip=' + options.spbill_create_ip);
  }

  console.log(sign);
  sign += ('&key=' + key);
  sign = utf8.encode(sign);

  console.log(sign);
  sign = crypto.createHash('md5').update(sign).digest('hex');

  return sign.toUpperCase();
}

function parseResult(xml, callback){
  try{
    var jsonResult = xmlParser.toJson(xml);
    var result = JSON.parse(jsonResult);
    return callback(null, result.xml);
  }
  catch(e){
    console.log();
    console.log(e);
    return callback({err: 'payment_result_parse_error'});

  }
}

function pay(paymentInfo, callback) {
  var key = Config.payment_params.privateKey;
  var payUrl = Config.payment_params.payUrl;
  var mch_appid = Config.payment_params.mch_appid; //公众号AppID wx6529791b014d0b22
  var mchid = Config.payment_params.mchid; //商户号

  var nonce_str = paymentInfo.nonce_str ? paymentInfo.nonce_str: generateNonceStr();
  var partner_trade_no = paymentInfo.partner_trade_no ? paymentInfo.partner_trade_no : generateNewPartnerTradeNo();
  var open_id = paymentInfo.open_id;//姗姗Elina
  var check_name = 'NO_CHECK'; //NO_CHECK：不校验, FORCE_CHECK: 强制校验，未实名认证的用户校验失败无法转账， OPTION_CHECK：针对已实名认证的用户才校验真实姓名
  var re_user_name = ''; //收款用户真实姓名。如果check_name设置为FORCE_CHECK或OPTION_CHECK，则必填用户真实姓名
  var amount = paymentInfo.amount;//至少100分
  var desc = 'Agilepops';
  var spbill_create_ip = paymentInfo.spbill_create_ip;
  var sign = generateSign({
    mch_appid: mch_appid,
    mchid: mchid ,
    nonce_str: nonce_str ,
    partner_trade_no: partner_trade_no ,
    openid: open_id ,
    check_name: check_name ,
    re_user_name: re_user_name ,
    amount: amount ,
    desc: desc ,
    spbill_create_ip: spbill_create_ip
  }, key);

  console.log('sign:', sign);

  var xml = '<xml>' +
    '<amount>' + amount + '</amount>' +
    '<check_name>' + check_name + '</check_name>' +
    '<desc>' + desc + '</desc>' +
    '<mch_appid>'+ mch_appid +'</mch_appid>' +
    '<mchid>' + mchid + '</mchid>' +
    '<nonce_str>' + nonce_str + '</nonce_str>' +
    '<openid>' + open_id+ '</openid>' +
    '<re_user_name>' + re_user_name + '</re_user_name>' +
    '<partner_trade_no>' + partner_trade_no + '</partner_trade_no>' +
    '<spbill_create_ip>' + spbill_create_ip + '</spbill_create_ip>' +
    '<sign>' + sign + '</sign>' +
    '</xml>';

  console.log('wechat request xml:');
  console.log(xml);
  var certification = {
    private_key: Config.payment_certificate.privatekey,
    certificate: Config.payment_certificate.certificate,
    ca: Config.payment_certificate.ca
  };
  console.log(certification);
  httpManager.post(payUrl, xml, certification, function (err, result) {
    if (err) {
      console.error(err);
      return callback(err);
    }

    console.log(result);
    parseResult(result, function(err, result){
      if(err){
        return callback(err);
      }

      if(!result.return_code){
        return callback({err: {type:'return_code_not_exist'}});
      }

      if(result.return_code.toUpperCase() === 'FAIL'){
        return callback({err: {type: result.err_code, message: result.err_code_des}});
      }

      if(result.result_code.toUpperCase() === 'FAIL'){
        return callback({err: {type: result.err_code, message: result.err_code_des}});
      }

      return callback(null, result);
    });
  });

};