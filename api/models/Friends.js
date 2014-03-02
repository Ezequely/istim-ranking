/**
 * Friends
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  schema: true,

  attributes: {
  	
  	name: {
  		type: 'string',
  		required: true
  	},

  	game: {
  		type: 'string',
  		unique: true,
  		required: true
  	},

  	pontuacao: {
  		type: 'integer',
  		required: true
  	},

    toJSON: function(){
      var obj = this.toObject();
      return obj;
    }
  }

};
