/**
 * isAuthenticated
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */

module.exports = function(req, res, next) {

  var http = require('http');
  var userId = req.body.userId;

  var params = "userId="+userId;

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
    var aux = '';
    res.on('data', function (chunk) {
      aux += chunk;
    });

    res.on('end', function() {
      var users = JSON.parse(aux);

      if(users.authenticated == "yes") {
        console.log("Authenticated");
        return success();
      }
      else {
        console.log("Unauthenticated");
        return error();
      }
    });
  });

  req.write(params);
    req.end();

  var success = function(){
    return next();
  }
  var error = function() {
    return res.forbidden('You must be logged in to perform this action.');
  }
};