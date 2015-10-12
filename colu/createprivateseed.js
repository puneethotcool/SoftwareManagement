var Colu = require('colu')

var settings = {
    network: 'testnet',
    privateSeed: null
}

var colu = new Colu(settings)
colu.on('connect', function () {
  var privateSeed = colu.hdwallet.getPrivateSeed()

    console.log("privateSeed: ", privateSeed)

    var address = colu.hdwallet.getAddress()

    console.log("address1: ", address)
});

colu.init()