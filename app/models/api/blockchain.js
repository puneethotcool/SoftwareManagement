var request = require('request')
var exports = module.exports = {};
var Colu = require('colu');

exports.queryAssets = function(address,callback){

	  request.get('http://testnet.api.coloredcoins.org:80/v3/addressinfo/'+address, function (error, response, body) {
            /*if (error) {
                return callback(error)
            }*/
            var licenseList;
            if (typeof body === 'string') {
                licenseList = JSON.parse(body)
            }
            return callback(licenseList);
        });
}

exports.queryAssetMetaData = function(assetId,transactionId,index,callback){
     request.get('http://testnet.api.coloredcoins.org:80/v3/assetmetadata/'+assetId+'/'+transactionId+':'+index, function (error, response, body) {
        
        var assetMetaData;
        if (typeof body === 'string') {
            assetMetaData = JSON.parse(body)
        }
         return callback(assetMetaData);
    });
}

exports.transferAssets = function(fromAddress,toAddress,privateSeed,assetId,callback){

    var settings = {
        network: 'testnet',
        privateSeed: privateSeed,
        coloredCoinsHost: 'https://testnet.api.coloredcoins.org',
        coluHost: 'https://testnet.engine.colu.co'
    }
    var colu = new Colu(settings);
    // var phoneNumber = '+1234567890';
    var send = {
    from: [fromAddress],
    to: [{
        address: toAddress,
        assetId: assetId,
        amount: 1
    }/*,{
        // phoneNumber: phoneNumber,
        assetId: assetId,
        amount: 1
    }*/],
    metadata: {        
        'assetName': '1 Ticket to see the Chicago Musical on 1/1/2016 at 8 PM',
        'issuer': 'Ticket booth on Times Square',
        'description': 'Seat 12 at row 10'
    }
};

colu.on('connect', function () {
    colu.sendAsset(send, function (err, body) {
        if (err) return console.error(err)        
        console.log("Body: ",body)
        callback("Transfer Completed");
    })
})
colu.init();


}