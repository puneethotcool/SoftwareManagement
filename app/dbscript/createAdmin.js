 var commonUtils = require('./../models/commonUtils');
 var redis = require("redis"),client = redis.createClient();
var Colu = require('colu');

var settings = {
    network: 'testnet',
    privateSeed: '6962dcb22b5cbe8b2e37471c5c00e9b1422dc8b1e83f3997d11625b6aac9d29d',
    coloredCoinsHost: 'https://testnet.api.coloredcoins.org',
    coluHost: 'https://testnet.engine.colu.co'
}

var userName = "admin";
var password = "admin";

settings.privateSeed=null;

var colu = new Colu(settings);
colu.init();
colu.on('connect', function () {

    var hash = commonUtils.encrypt(password);

     
    var privateSeed = colu.hdwallet.getPrivateSeed();
    var address = colu.hdwallet.getAddress();
    console.log("privateseed:" + privateSeed);
    console.log("address:" + address);
    client.hmset(userName,
                 'address', address,
                 'privateseed', privateSeed,
                 'location', "admin",
                 'department',"admin",
                 'password', hash, function (error, result) {
                                if (error) {
                                    return false;
                                }
                                else {
                                    return true;
                                }
                             });
        });