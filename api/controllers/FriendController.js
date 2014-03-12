/**
 * FriendController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

  create: function(req, res) {
    var user = parseInt(req.param("userId"));
    var game = req.param("game");
    var point = parseInt(req.param("point"));
    //if (req.session.user) {
      if (!user) return res.send(400, {error: 'Parameter \'userId\' Missing'});
      Friend.findOneByUserId(/*req.session.user.id*/user).done(function(err, friend){
        if (err) return res.send(500, {error: 'DB Error'});
        if (friend) return res.send(400, {error: 'Ja existe friend para este userId'});
        if (!friend) {
          Friend.create({userId: user, game: game, point: point}).done(function (err, friend) {
            if (err) return res.send(500, {error: 'Error Save Object'});
            res.send(200,friend);
          });
          
        } else {
          Friend.create({userId: user, game: game, point: point}).done(function(err, friend) {
            if (err) return res.send(500, {error: 'Error Save Object'});
            res.send(200,friend);
          });
          
        }
      });
    //}
  },

show: function(req, res) {
    var user = parseInt(req.param("userId"));
      if (!user) return res.send(400, {error: 'Parameter \'userId\' Missing'});
      Friend.findOneByUserId(/*req.session.user.id*/user).done(function(err, friend){
        if (err) return res.send(500, {error: 'DB Error'});
        if (friend) return res.send(200,friend);
        else return res.send(404, {error: 'User Not Found'});
      });
    },

  destroy: function(req, res) {
    var user = parseInt(req.param("userId"));
    //if (req.session.user) {
      if (!user) return res.send(400, {error: 'Parameter \'userId\' Missing'});
      Friend.findOneByUserId(/*req.session.user.id*/user).done(function(err, friend) {
        if (err) return res.send(500, {error: 'DB Error'});
        if (!friend) return res.send(404, {error: 'User Not Found'});
        friend.destroy(function(err){
          if (err) return res.send(500, {error: 'Error Destroy Object'});
          res.send(200,friend);
        });
      });
    //}
  },

  update: function(req, res) {
    var user = parseInt(req.param("userId"));
    var game = req.param("game");
    var point = parseInt(req.param("point"));
    var newuser = req.param("newUser");
    if (!user) return res.send(400, {error: 'Parameter \'userId\' Missing'});

    if(newuser) {

    Friend.findOneByUserId(newuser).done(function (err, friend) {
        if (friend) {
         user = newuser;
        return res.send(400, {error: 'User Already Friend Created'});
      }
    });
   }
   
    Friend.findOneByUserId(user).done(function (err, friend) {
      
      if (err) return res.send(500, {error: 'DB Error'});
      if (!friend) return res.send(404, {error: 'User Not Found'});
      if (point && !newuser) {
        friend.point = point;
      } else if (newuser && !point) {
        point.userId = newuser;
      } else if (point && newuser) {
        friend.userId = newuser;
        friend.point = point;
      }
      friend.save(function(err){
        if (err) return res.send(500, {error: 'Error Save Object'});
        res.send(200, friend);
      });
    });
  },

  debit: function(req, res) {
    var user = parseInt(req.param("userId"));
    var game = req.param("game");
    var point = parseInt(req.param("point"));
    //if (req.session.user) {
      if (!user) return res.send(400,{error: 'Parameter \'userId\' Missing'});
      if (!point) return res.send(400,{error: 'Parameter \'point\' Missing'});
      Friend.findOneByUserId(/*req.session.user.id*/user).done(function(err, friend){
        if (err) return res.send(500, {error: 'DB Error'});
        if (!friend) return res.send(404,{ error: 'User Not Found'});
        if (friend.point >= point){
          friend.point -= point;
          friend.save(function(err) {
            if (err) return res.send(500,{error: 'Error Save Object'});
          });
          return res.send(200,friend);
        }
        return res.send(200,{error: 'Point Insufficient'});
      });
    //}
  },

  credit: function(req, res) {
    var user = parseInt(req.param("userId"));
    var game = req.param("game");
    var point = parseInt(req.param("point"));
     //if (req.session.user) {
      if (!user) return res.send(400,{error: 'Parameter \'userId\' Missing'});
      if (!point) return res.send(400,{error: 'Parameter \'point\' Missing'});
      Friend.findOneByUserId(/*req.session.user.id*/user).done(function(err, friend){
        if (err) return res.send(500, {error: 'DB Error'});
        if (!friend) return res.send(404,{ error: 'User Not Found'});
        if (point >= 0){
          friend.point += point;
          point.save(function(err) {
            if (err) return res.send(500,{error: 'Error Save Object'});
          });
          return res.send(200,friend);
        }
        return res.send(200,{error: 'Friend Value Invalid'});
      });
    //}
  },

  _config: {}

};