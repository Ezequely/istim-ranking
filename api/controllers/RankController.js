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
    
	'new': function (req, res) {
		res.view();
	},

	create: function (req, res, next) {
		
		Rank.create( req.params.all(), function rankCreated (err, rank) {
			
			if (err) {
				console.log(err);
				req.session.flash = {
					err: err
				}

				return res.redirect('/rank/new');
			};


			
			res.redirect('rank/show'+rank.id);
		});
	},

	show: function(req, res, next) {
		Rank.findOne(req.param('id'), function foundRank (err, rank) {
			if (err) return next(err);
			if (!rank) return next();
			res.view({
				rank: rank
			});
		});
	}
};
