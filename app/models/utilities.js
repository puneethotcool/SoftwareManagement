/**
 * Created by Ishwarya on 14-10-2015.
 */
var redis = require("redis"),
    client = redis.createClient();
var crypto = require('crypto');
var Colu = require('colu');

var settings = {
    network: 'testnet',
    privateSeed: '6962dcb22b5cbe8b2e37471c5c00e9b1422dc8b1e83f3997d11625b6aac9d29d',
    coloredCoinsHost: 'https://testnet.api.coloredcoins.org',
    coluHost: 'https://testnet.engine.colu.co'
}

module.exports = {

    signUpUser: function(userData){
        var jsonData = JSON.parse(userData.body.mydata);
        settings.privateSeed=null;
        var colu = new Colu(settings);
        colu.init();
        colu.on('connect', function () {
            var hash = crypto
                .createHash("md5")
                .update(jsonData.password)
                .digest('hex');

            var privateSeed = colu.hdwallet.getPrivateSeed();
            var address = colu.hdwallet.getAddress();
            console.log("privateseed:" + privateSeed);
            console.log("address:" + address);
            client.hmset(jsonData.username, 'address', address, 'privateseed', privateSeed, 'location', jsonData.location, 'department', jsonData.department, 'password', hash, function (error, result) {
                if (error) {
                    return false;
                }
                else {
                    return true;
                }
            });
        });
    }
}