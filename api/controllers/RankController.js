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
		
		var rankObj = {
			name: req.param('name'),
			game: req.param('game'),
			pontuacao: req.param('pontuacao')
    	}
		Rank.create( rankObj, function rankCreated (err, rank) {
			
			if (err) return res.redirect('rank/new');
			
			res.json(rank);
		});
	}
};
