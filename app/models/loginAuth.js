
var jwt = require('jsonwebtoken');  //https://npmjs.org/package/node-jsonwebtoken
var expressJwt = require('express-jwt'); //https://npmjs.org/package/express-jwt

var exports = module.exports = {};

exports.authenticateUser = function(req, res){

	console.log("Validating user");
	if (!(req.body.username === 'puneet' && req.body.password === 'puneet')) {
    res.status(401).send('Wrong user or password');
    return;
  }

  var secret = 'this is the secret secret secret 12356';
  var profile = {
    first_name: 'puneet',
    last_name: 'kumar',
    email: 'puneet@gmail.com',
    id: 123
  };

  // We are sending the profile inside the token
  var token = jwt.sign(profile, secret, { expiresInMinutes: 60*5 });
console.log('token' + token);
  res.json({ token: token });
} 
