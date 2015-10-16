/**
 * Created by Ishwarya on 14-10-2015.
 */
var redis = require("redis"),
    client = redis.createClient();
var Colu = require('colu');
var commonUtils = require('./commonUtils');



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
          /*  var hash = crypto
                .createHash("md5")
                .update(jsonData.password)
                .digest('hex');*/
            var hash = commonUtils.encrypt(jsonData.password);

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
    },

    requestLicense : function(userData){
        var jsonData = JSON.parse(userData.body.mydata);
        settings.privateSeed=null;

        var status ='Pending';
        var userRequest = [];
        userRequest.push(userData.body.mydata);
        client.rpush('SoftwareRequest', userRequest);
    },

    myPendingTasks : function(userName,callback){
        //var jsonData = JSON.parse(userData.body.mydata);
        var requests = client.lrange('SoftwareRequest',0,-1,function(err,res){
            var resonseArray = [];
            for(var i in res){
                resonseArray.push(JSON.parse(res[i]));

            }
            console.log('request: '+ resonseArray);
            return callback(resonseArray);

        });
        console.log('requests: '+ requests);
    },

    issueLicense : function(userData){
        var jsonData = JSON.parse(userData.body.mydata);
        var address='';
        client.hmget(jsonData.username,['address','privateseed'],function(err,res){
            console.log('address redis: '+res[0].toString());
            address = res[0].toString();
            private = res[1].toString();
            settings.privateSeed=private;
            var colu = new Colu(settings);
            colu.init();
            colu.on('connect', function () {
                var asset = {
                    amount: jsonData.quantity,
                    issueAddress: address,
                    address: address,
                    divisibility: 0,
                    reissueable: false,
                    transfer: [{
                        amount: jsonData.quantity  //Quantity will be 1
                    }],
                    metadata: {
                        'assetName': jsonData.software,
                        'issuer': jsonData.software,
                        'expiryDate': jsonData.expirationdate,
                        'key':jsonData.key,
                        'companyName':jsonData.companyName,
                        'version':jsonData.version
                    },
                    expiration: jsonData.expirationdate
                }
                colu.issueAsset(asset, function (err, body) {
                    if (err) return console.error(err)
                    assetId = body.assetId
                    console.log("Body: ", body)
                })
            });
        });
        return true;
    }
}