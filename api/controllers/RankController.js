/**
 * RankController
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
      Rank.findOneByUserId(/*req.session.user.id*/user).done(function(err, rank){
        if (err) return res.send(500, {error: 'DB Error'});
        if (!rank) {
          Rank.create({userId: user, game: game, point: point}).done(function (err, rank) {
            if (err) return res.send(500, {error: 'Error Save Object'});
            res.send(200,rank);
          });
          
        } else {
          Rank.create({userId: user, game: game, point: point}).done(function(err, rank) {
            if (err) return res.send(500, {error: 'Error Save Object'});
            res.send(200,rank);
          });
          
        }
      });
    //}
  },

show: function(req, res) {
    var user = parseInt(req.param("userId"));
      if (!user) return res.send(400, {error: 'Parameter \'userId\' Missing'});
      Rank.findOneByUserId(/*req.session.user.id*/user).done(function(err, rank){
        if (err) return res.send(500, {error: 'DB Error'});
        if (rank) return res.send(200,rank);
        else return res.send(404, {error: 'User Not Found'});
      });
    },

  destroy: function(req, res) {
    var user = parseInt(req.param("userId"));
    //if (req.session.user) {
      if (!user) return res.send(400, {error: 'Parameter \'userId\' Missing'});
      Rank.findOneByUserId(/*req.session.user.id*/user).done(function(err, rank) {
        if (err) return res.send(500, {error: 'DB Error'});
        if (!rank) return res.send(404, {error: 'User Not Found'});
        rank.destroy(function(err){
          if (err) return res.send(500, {error: 'Error Destroy Object'});
          res.send(200,rank);
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

    Rank.findOneByUserId(newuser).done(function (err, rank) {
        if (rank) {
         user = newuser;
        return res.send(400, {error: 'User Already Rank Created'});
      }
    });
   }
   
    Rank.findOneByUserId(user).done(function (err, rank) {
      
      if (err) return res.send(500, {error: 'DB Error'});
      if (!rank) return res.send(404, {error: 'User Not Found'});
      if (point && !newuser) {
        rank.point = point;
      } else if (newuser && !point) {
        point.userId = newuser;
      } else if (point && newuser) {
        rank.userId = newuser;
        rank.point = point;
      }
      rank.save(function(err){
        if (err) return res.send(500, {error: 'Error Save Object'});
        res.send(200, rank);
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
      Rank.findOneByUserId(/*req.session.user.id*/user).done(function(err, rank){
        if (err) return res.send(500, {error: 'DB Error'});
        if (!rank) return res.send(404,{ error: 'User Not Found'});
        if (rank.point >= point){
          rank.point -= point;
          rank.save(function(err) {
            if (err) return res.send(500,{error: 'Error Save Object'});
          });
          return res.send(200,rank);
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
      Rank.findOneByUserId(/*req.session.user.id*/user).done(function(err, rank){
        if (err) return res.send(500, {error: 'DB Error'});
        if (!rank) return res.send(404,{ error: 'User Not Found'});
        if (point >= 0){
          rank.point += point;
          point.save(function(err) {
            if (err) return res.send(500,{error: 'Error Save Object'});
          });
          return res.send(200,rank);
        }
        return res.send(200,{error: 'Rank Value Invalid'});
      });
    //}
  },

  _config: {}

};