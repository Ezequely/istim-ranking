var request = require("supertest")
var assert = require("assert");
var should = require("should");

describe('Routing', function() {
  var url = 'http://localhost:1337';

  var rank = {
    userId: 9,
    game: 'Dota2',
    point: 1000,
  };

  var new_userId= 99;
  var new_game = 'Leleks';
  var point = 1111;

  describe('API - No errors path', function() {

    it('should return status 201 after CREATING a rank', function(done) {
      request(url)
        .post('/rank/create')
        .send(rank)
        .expect(201)
        .end(function(err, res) {
            if (err) {
              throw err;
            }
            done();
        });
    });

    it('should return status 200 after UPDATING a rank\'s name', function(done) {
      request(url)
        .put('/rank/1')
        .send({userId: new_userId})
        .expect(200)
        .end(function(err, res) {
            if (err) {
              throw err;
            }
            assert.equal(res.body.userId, new_userId)
            done();
        });
    });

    it('should return status 200 after UPDATING a rank\'s description', function(done) {
      request(url)
        .put('/rank/1')
        .send({game: new_game})
        .expect(200)
        .end(function(err, res) {
            if (err) {
              throw err;
            }
            assert.equal(res.body.userId, new_userId)
            done();
        });
    });

    it('should return status 200 after UPDATING a rank\'s publisher', function(done) {
      request(url)
        .put('/rank/1')
        .send({point: new_point})
        .expect(200)
        .end(function(err, res) {
            if (err) {
              throw err;
            }
            assert.equal(res.body.point, new_point)
            done();
        });
    });

    it('should return status 200 after DELETING a rank', function(done) {
      request(url)
        .del('/rank/1')
        .expect(200)
        .end(function(err, res) {
            if (err) {
              throw err;
            }
            done();
        });
    });

  });
});