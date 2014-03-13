before(function(done) {
  // Lift Sails and store the app reference
  require('sails').lift({

    // turn down the log level so we can view the test results
    log: {
      level: 'error'
    },

  }, function(err, sails) {
       // export properties for upcoming tests with supertest.js
       sails.localAppURL = localAppURL = ( sails.usingSSL ? 'https' : 'http' ) + '://' + sails.config.host + ':' + sails.config.port + '';
       // save reference for teardown function
       done(err);
     });

});

var supertest = require("supertest")
var assert = require("assert");
var should = require("should");

describe('when requesting create on api only by passing userId', function () {

    it ('should create an object at Model Rank with the userId given and its point should be 0', function (done) {
      supertest(sails.express.app)
        .get('/Rank/create?userId=nDummyObject')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          Rank.findOneByUserId("nDummyObject").done(function(err, coin) {
          assert.equal(coin.userId, "nDummyObject");
          assert.equal(coin.point, 0);
          done();          
        })
      })
    })
  })