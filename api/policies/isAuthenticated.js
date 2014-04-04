/**
 * isAuthenticated
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */

var authHelper = function(users, userId) {
  if(users.authenticated == "yes"){
    console.log("\n\Is AUTH\n\n");
    return true;
  }
  console.log("\n\Is NOT AUTH\n\n");
  return false;
}

module.exports = function(req, res, next) {

  var http = require('http');
  var userId = req.body.userId;
  var str = '';

  var options = {
    hostname: 'istim-user.nodejitsu.com',
    port: 80,
    path: '/authenticated',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': params.length
    }
  };

  var req = http.request(options, function(res) {
    res.on('data', function (chunk) {
      str += chunk;
    });

    res.on('end', function() {
      var users = JSON.parse(str);

      if(authHelper(users, userId)){
        return success();
      }
      else{
        return error();
      }
    });
  });

  var success = function() {
    return next();
  }
  
};
