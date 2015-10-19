var request = require('request');
var blockchain = require('./api/blockchain');
var redis = require("redis"),  client = redis.createClient();

async = require("async");

var exports = module.exports = {};

exports.getSoftwareLicenses = function(username,callback) {
    console.log('Get from: ' +username);
    client.hmget(username,['address'],function(err,response){
         if(!response[0]) return;
		console.log('address:'+response[0]);
         var allAssets = [];
         blockchain.queryAssets(response[0],function(assets){
         	extractAssets(assets.utxos,function(allAssets){
				console.log('returning from getSoftwareLicenses');
         		return callback(allAssets);
         	});

         });      
    });
    
}



exports.getIssuedLicenses = function(callback) {
	var issuedLicenses = [];
	var requests = client.lrange('RegisteredUsers',0,-1,function(err,users){

		async.each(users,function(user,callback){
			console.log('before calling getSoftwareLicenses');
			exports.getSoftwareLicenses(user,function(issuedAssets){
				issuedAssets.user=user;
				console.log('obtained getSoftwareLicenses: '+JSON.stringify(issuedAssets));
				issuedLicenses.push(issuedAssets);
				  callback();
			})
		},
				function(err){
					console.log('passing response back');
					return callback(issuedLicenses);
				}
		);
	});
}

extractAssets = function(assets,callback){
	var allAssets = [];
	async.each(assets,function(asset,callback){
			console.log('before calling queryAssetMetaData')
				queryAssetMetaData(asset,function(assetMetaData){
					if(assetMetaData)
						allAssets.push(assetMetaData);
					callback();
				});
					},
			function(err){
				console.log('returning from extractAssets');
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
						console.log('assetMetaData: '+JSON.stringify(assetMetaData));
						return callback(assetMetaData);
					});
         		}else{
         			return callback(null);
         		}
}