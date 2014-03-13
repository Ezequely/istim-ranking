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
    var friend = parseInt(req.param("friendId"));
    var game = req.param("game");
    var point = parseInt(req.param("point"));
    //if (req.session.user) {
      if (!user) return res.send(400, {error: 'Parameter \'userId\' Missing'});
      if (!friend) return res.send(400, {error: 'Parameter \'friendId\' Missing'});
      Friend.findOneByFriendId(/*req.session.user.id*/user).done(function(err, friend){
        if (err) return res.send(500, {error: 'DB Error'});
        if (user & friend) return res.send(400, {error: 'Ja existe friend para este userId'});
        if (!friend) {
          Friend.create({userId: user, friendId: friend, game: game, point: point}).done(function (err, friend) {
            if (err) return res.send(500, {error: 'Error Save Object'});
            res.send(200,friend);
          });
          
        } else {
          Friend.create({userId: user, friendId: friend, game: game, point: point}).done(function(err, friend) {
            if (err) return res.send(500, {error: 'Error Save Object'});
            res.send(200,friend);
          });
          
        }
      });
    //}
  },

show: function(req, res) {
    var friend = parseInt(req.param("friendId"));
      if (!friend) return res.send(400, {error: 'Parameter \'friendId\' Missing'});
      Friend.findOneByUserId(/*req.session.user.id*/user).done(function(err, friend){
        if (err) return res.send(500, {error: 'DB Error'});
        if (friend) return res.send(200,friend);
        else return res.send(404, {error: 'User Not Found'});
      });
    },

  destroy: function(req, res) {
    var friend = parseInt(req.param("friendId"));
    //if (req.session.user) {
      if (!friend) return res.send(400, {error: 'Parameter \'friendId\' Missing'});
      Friend.findOneByUserId(/*req.session.user.id*/user).done(function(err, friend) {
        if (err) return res.send(500, {error: 'DB Error'});
        if (!friend) return res.send(404, {error: 'Friend Not Found'});
        friend.destroy(function(err){
          if (err) return res.send(500, {error: 'Error Destroy Object'});
          res.send(200,friend);
        });
      });
    //}
  },

  update: function(req, res) {
    var user = parseInt(req.param("userId"));
    var friendId = parseInt(req.param("friendId"));
    var game = req.param("game");
    var point = parseInt(req.param("point"));
    var newfriend = req.param("newFriend");
    if (!user) return res.send(400, {error: 'Parameter \'userId\' Missing'});
    if (!friend) return res.send(400, {error: 'Parameter \'friendId\' Missing'});

    if(newuser) {

    Friend.findOneByUserId(newuser).done(function (err, friend) {
        if (friend) {
         friend = newfriend;
        return res.send(400, {error: 'User Already Friend Created'});
      }
    });
   }
   
    Friend.findOneByUserId(user).done(function (err, friend) {
      
      if (err) return res.send(500, {error: 'DB Error'});
      if (!friend) return res.send(404, {error: 'User Not Found'});
      if (point && !newfriend) {
        friend.point = point;
      } else if (newfriend && !point) {
        point.userId = newfriend;
      } else if (point && newfriend) {
        friend.userId = newfriend;
        friend.point = point;
      }
      friend.save(function(err){
        if (err) return res.send(500, {error: 'Error Save Object'});
        res.send(200, friend);
      });
    });
  }

};