var request = require('request')
var exports = module.exports = {};

exports.queryAssets = function(address,callback){

	  request.get('http://testnet.api.coloredcoins.org:80/v3/addressinfo/'+address, function (error, response, body) {
            /*if (error) {
                return callback(error)
            }*/
            var licenseList;
            if (typeof body === 'string') {
                licenseList = JSON.parse(body)
            }
            callback(licenseList);
        });
}

exports.queryAssetMetaData = function(assetId,transactionId,index,callback){
     request.get('http://testnet.api.coloredcoins.org:80/v3/assetmetadata/'+assetId+'/'+transactionId+':'+index, function (error, response, body) {
        
        var assetMetaData;
        if (typeof body === 'string') {
            assetMetaData = JSON.parse(body)
        }
         callback(assetMetaData);
    });
}