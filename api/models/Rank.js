/**
 * Rank
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  schema: true,

  attributes: {

  	userId: {
  		type: 'integer'
  	},

  	game: {
  		type: 'string'
  	},

  	point: {
  		type: 'integer'
  	},

    toJSON: function(){
      var obj = this.toObject();
      return obj;
    }
  }

};
