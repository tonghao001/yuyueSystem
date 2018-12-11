'use strict';

module.exports = {
    env: 'development',
    // appDb: 'mongodb://localhost/z-auth-dev',
    // logDb: 'mongodb://localhost/z-log-dev',
    serverAddress: 'http://localhost:5002/',
    port: process.env.PORT || 5002,
    wechat: {"app_id":"wxd6ee160182944b8d","app_secret":"ec4adfc014988379e365a5e3906317e8","getTokenUrl":"https://api.weixin.qq.com/cgi-bin/token","getUserInfoUrl":"https://api.weixin.qq.com/cgi-bin/user/info","autoReplyUrl":"https://api.weixin.qq.com/cgi-bin/message/custom/send"},//公众平台 顺手赚吧
    // redisServer: {"address":"127.0.0.1","port":"6379","connection":"redis://localhost:6379","password":"Elina","ttl":86400,"app_ttl":777600},
    // wechat_server: {"address":"https://api.weixin.qq.com/","app_id":"wx0918b8e7ebb45873","app_secret":"d4624c36b6795d1d99dcf0547af5443d"},//开放平台中 顺手赚钱应用appid
    // wechat_server_staff: {"address":"https://api.weixin.qq.com/","app_id":"wx5e2861ec43391c12","app_secret":"ce911b4a995db44cdbc7ce85ae85aa80"}//开放平台中 顺手赚钱应用appid
};
