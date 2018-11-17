var Fcash_ = {
  btc: require('fcash-lib')
};

var _ = require('lodash');

function AddressTranslator() {
};


AddressTranslator.getAddressCoin = function(address) {
  try {
    new Fcash_['btc'].Address(address);
    return 'btc';
  } catch (e) {
    try {
      new Fcash_['bch'].Address(address);
      return 'bch';
    } catch (e) {
      return;
    }
  }
};

AddressTranslator.translate = function(addresses, coin, origCoin) {
  var wasArray = true;
  if (!_.isArray(addresses)) {
    wasArray = false;
    addresses = [addresses];
  }
  origCoin = origCoin || AddressTranslator.getAddressCoin(addresses[0]);
  var ret =  _.map(addresses, function(x) {
    var orig = new Fcash_[origCoin].Address(x).toObject();
    return Fcash_[coin].Address.fromObject(orig).toString();
  });

  if (wasArray) 
    return ret;
  else 
    return ret[0];

};

AddressTranslator.translateInput = function(addresses) {
  return this.translate(addresses, 'btc', 'bch');
}

AddressTranslator.translateOutput = function(addresses) {
  return this.translate(addresses, 'bch', 'btc');
}




module.exports = AddressTranslator;
