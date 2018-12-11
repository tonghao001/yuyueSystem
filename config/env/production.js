'use strict';

module.exports = {
    env: 'production',
    appDb: 'mongodb://elina:Social2016@10.117.194.50:27017/z-auth-pro',
    logDb: 'mongodb://elina:Social2016@10.117.194.50:27017/z-log-pro',
    serverAddress: 'http://localhost/',
    port: process.env.PORT || 80,
    mainAddress: 'https://agilepops.com/',
    wechat: {
        app_id: "wx6529791b014d0b22",
        app_secret: "6eb90c4299c417ebea1e344682d5124c",
        getTokenUrl: "https://api.weixin.qq.com/cgi-bin/token",
        getUserInfoUrl: "https://api.weixin.qq.com/cgi-bin/user/info",
        autoReplyUrl: "https://api.weixin.qq.com/cgi-bin/message/custom/send"
    },//公众平台 顺手赚吧
    // redisServer: {"address":"120.55.91.101","port":"7071","connection":"redis://120.55.91.101:7071","password":"myRedisElina2016","ttl":86400,"app_ttl":777600},
    // wechat_server: {
    //     "address":"https://api.weixin.qq.com/",
    //     "app_id":"wx0918b8e7ebb45873",
    //     "app_secret":"d4624c36b6795d1d99dcf0547af5443d"
    // },//开放平台中 顺手赚钱应用appid
    // wechat_server_staff: {"address":"https://api.weixin.qq.com/","app_id":"wx5e2861ec43391c12","app_secret":"ce911b4a995db44cdbc7ce85ae85aa80"}//开放平台中 顺手赚钱应用appid
};
