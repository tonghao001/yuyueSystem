'use strict';

module.exports = {
    env: 'production-test',
    // appDb: 'mongodb://localhost/z-auth-pro-test',
    // logDb: 'mongodb://localhost:27017/z-log-pro-test',
    serverAddress: 'http://localhost/',
    port: process.env.PORT || 80,
    mainAddress: 'https://datonghao.com/',
    wechat: {
        app_id: "wxa6210d998dd41246",
        app_secret: "f55b2c01ab809977f21b69e615861621",
        getTokenUrl: "https://api.weixin.qq.com/cgi-bin/token",
        getUserInfoUrl: "https://api.weixin.qq.com/cgi-bin/user/info",
        autoReplyUrl: "https://api.weixin.qq.com/cgi-bin/message/custom/send"
    },//公众平台 顺手赚吧
    // redisServer: { "address": "120.26.108.210", "port": "7071", "ttl": 86400, "connection": "redis://120.26.108.210:7071", "password": "myRedisElina2016", "app_ttl": 777600 },
    // wechat_server: { "address": "https://api.weixin.qq.com/", "app_id": "wx0918b8e7ebb45873", "app_secret": "d4624c36b6795d1d99dcf0547af5443d" },//开放平台中 顺手赚钱应用appid
    // wechat_server_staff: { "address": "https://api.weixin.qq.com/", "app_id": "wx5e2861ec43391c12", "app_secret": "ce911b4a995db44cdbc7ce85ae85aa80" }//开放平台中 顺手赚钱应用appid
};
