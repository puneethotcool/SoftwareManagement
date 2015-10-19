var redis = require("redis"),
    client = redis.createClient();

getAllSoftwareRequests = function(callback){
    client.lrange('SoftwareRequest',0,-1,function(err,res){
            return callback(res);
        });
}

module.exports = {



getAddressFromDB : function(id,callback){
    client.hmget(id,['address'],function(err,response){
    if(!response[0]) {
        return callback(401,response[0]);
     /*   res.status(401).send('User Not Registered');
          return;*/
       }
       callback(null,response[0]);
       // console.log("From Redis" , fromAddress);
  });
},

getPrivateSeedFromDB : function(id,callback){
    client.hmget(id,['privateseed'],function(err,response){
    if(!response[0]) {
       /* res.status(401).send('User Not Registered');
          return;*/
           return callback(401,response[0]);
       }
       callback(null,response[0]);
       // console.log("From Redis" , fromAddress);
  });
},

updateSoftwareRequestedStatus : function(requestRecordId,status,callback){
	getAllSoftwareRequests(function(res){

		for(var i in res){
              var jdata =  JSON.parse(res[i]);
              	if(jdata.id == requestRecordId){ 
              		jdata.status = status;
              		var jstr = JSON.stringify(jdata); 
              		client.lset('SoftwareRequest',i,jstr,function(err,response){
              			console.log('SoftwareRequest update ' + response);
              		});
              	}
            }
	});

}


}