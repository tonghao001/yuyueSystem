// /**
//  * Created by elinaguo on 15/10/13.
//  */
// 'use strict';
// var Config = require('../../config/config');
// var CachemanRedis = require('cacheman-redis');

// exports.createNewCache = function(){
//   var options = {
//     port: Config.redisServer.port,
//     host: Config.redisServer.address
//   };
//   if(Config.redisServer.password){
//     options.password = Config.redisServer.password;
//   }
//   return new CachemanRedis(options);
// };

// exports.setKeyValueToCache = function(key, value, toCache, ttl, callback){
//   toCache.set(key, value, ttl, function(err, value){
//     if(err){
//       return callback(err);
//     }

//     return callback(null, value);
//   });
// };

// exports.getValueByKeyInCache = function(key, inCache, callback){
//   inCache.get(key, function(err, value){
//     if(err){
//       return callback(err);
//     }
//     return callback(null, value);
//   });
// };

// exports.deleteKeyfromCache = function(key, fromCache, callback){
//   fromCache.del(key, function(err){
//     if(err){
//       return callback(err);
//     }
//     return callback();
//   });
// };

// exports.clearTheCache = function(theCache, callback){
//   theCache.clear(function(err, value){
//     if(err){
//       return callback(err);
//     }
//     return callback(null, value);
//   });
// };
