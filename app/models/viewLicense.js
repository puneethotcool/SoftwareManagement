var request = require('request');
var blockchain = require('./api/blockchain');
var redis = require("redis"),  client = redis.createClient();

async = require("async");

var exports = module.exports = {};

exports.getSoftwareLicenses = function(username,callback) {
    console.log('Get from: ' +username);
    client.hmget(username,['address'],function(err,response){
         if(!response[0]) return;
         var allAssets = [];
         blockchain.queryAssets(response[0],function(assets){
         	extractAssets(assets.utxos,function(allAssets){
         		return callback(allAssets);
         	});

         });      
    });
    
}

extractAssets = function(assets,callback){
	var allAssets = [];
	async.each(assets,function(asset,callback){
				queryAssetMetaData(asset,function(assetMetaData){
					if(assetMetaData)
						allAssets.push(assetMetaData);
					callback();
				});
					},
			function(err){
				return callback(allAssets);
			}
	);
}

queryAssetMetaData = function(assetData,callback){
	var asset = assetData.assets[0];
		if(asset) {
         				
					var index = assetData.index;
					var assetId=asset.assetId;
					var issueTxid =asset.issueTxid;
					console.log('index : '+ index);
     				console.log('assetId : ' + assetId);
					console.log('issueTxid :' + issueTxid);
					blockchain.queryAssetMetaData(assetId,issueTxid,index,function(assetMetaData){
						return callback(assetMetaData);
					});
         		}else{
         			return callback(null);
         		}
}