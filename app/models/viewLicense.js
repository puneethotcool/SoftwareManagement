var request = require('request');
var blockchain = require('./api/blockchain');
var redis = require("redis"),  client = redis.createClient();

// get address info
/*var address = 'mzyVsNwWwGfvGiLDXV9ixg4M7c2yfRk3Lc'*/

var exports = module.exports = {};

exports.getSoftwareLicenses = function(username) {
    console.log('Get from: ' +username);

    client.hmget(username,['address'],function(err,response){

         if(!response[0]) return;
         blockchain.queryAssets(response[0],function(assets){
         	// console.log('queryAddress : '+ JSON.stringify(assets)); 	
         		for(var t in assets.utxos) {
         			

         			var asset = assets.utxos[t].assets[0];
         			if(asset) {
         				
						var index = assets.utxos[t].index;
						var assetId=asset.assetId;
						var issueTxid =asset.issueTxid;
						console.log('index : '+ index);
         				console.log('assetId : ' + assetId);
						console.log('issueTxid :' + issueTxid);
						blockchain.queryAssetMetaData(assetId,issueTxid,index,function(assetMetaData){
							console.log('assetMetaData : ' + JSON.stringify(assetMetaData));
						});
         			}
						

         		}
         /*		console.log('assetMetaDatas : ' + JSON.stringify(assetMetaDatas));*/
         });


    });
    
}