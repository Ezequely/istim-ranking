/**
 * isGameOwner
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */


module.exports = function(req, res, next) {

  var http = require('http');

  var params = "email=admin@istimuser.com&password=passadmin";

  var options = {
      host : "istim-user.nodejitsu.com",
      port : 80,
      path : "/auth/login",
      method : 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': params.length
      }
  };

  var post_req = http.request(options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
          console.log('Response: ' + chunk);
      });
  });

  post_req.write(params);
  post_req.end();

  return next();
};