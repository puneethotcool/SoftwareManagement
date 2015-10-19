
    var app = angular.module('transferLicense', ['ngMessages']);

    app.controller('transferLicenseController', ['$scope','$http','Licenses' ,'$rootScope','$filter',function( $scope,$http,Licenses,$rootScope,$filter) {

 Licenses.view()
    .success(function(data) {
        console.log('data: '+ JSON.stringify(data));
        $scope.assetsData = data;
        filterAssetWithoutMetaData();
    });


filterAssetWithoutMetaData = function(){
    // $scope.assetsData = $filter('filter')($scope.assetsData, {!asset.metadataOfIssuence});

    $scope.assetsData = $scope.assetsData.filter(function(asset) {
    return asset.metadataOfIssuence;
});
  
}

removeAssetDataItem = function(index){
    $scope.assetsData.splice(index, 1);
  }

$scope.transferDirectLicense = function(index){
    console.log('transferDirectLicense Index ' + index)
    var asset = $scope.assetsData[index];
    var assetId = asset.assetId;
    var fromUserId = $rootScope.loggedUser;
    
    var toUserId = asset.transferToUser;

    console.log('asset   5252'+asset);
    console.log('transferLicense -'  + assetId +' : '+ fromUserId +' : '+ toUserId);

    var data = {'fromId' : fromUserId,
                'toId' : toUserId ,
                'assetId' : assetId,
                'requestRecordId': ''};

    var finalData = 'mydata='+JSON.stringify(data);
    console.log(data +' -----------------'+ finalData);
    Licenses.transfer(finalData);
    alert('Transfer Complete');
    removeAssetDataItem(index);
  }

}]);

