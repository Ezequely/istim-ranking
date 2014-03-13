var rankPage = angular.module('rank-page', []);
<<<<<<< HEAD
var url_default = 'http://istim-ranking.nodejitsu.com/rank';
function mainController($scope, $http) {
  $scope.formData = {};
  $http.get(url_default+'/')
=======
var url_defaultr = 'http://istim-ranking.nodejitsu.com/rank';
function rankController($scope, $http) {
  $scope.formData = {};
  $http.get(url_defaultr+'/')
>>>>>>> 8476547c998c7c331cca8b8084493b161430f7ab
    .success(function(data) {
      $scope.ranks = data;
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

  $scope.createRank = function() {
<<<<<<< HEAD
    $http.post(url_default+'/', $scope.formData)
=======
    $http.post(url_defaultr+'/', $scope.formData)
>>>>>>> 8476547c998c7c331cca8b8084493b161430f7ab
      .success(function(data) {
        $scope.formData = {};
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };

  $scope.deleteRank = function(userId) {
<<<<<<< HEAD
    var url = url_default+'?userId='+userId;
    $http.delete(url)
=======
    var urlr = url_defaultr+'?userId='+userId;
    $http.delete(urlr)
>>>>>>> 8476547c998c7c331cca8b8084493b161430f7ab
      .success(function(data) {
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };

  $scope.updateRank = function(userId) {
<<<<<<< HEAD
    var url = url_default+'?userId='+userId;
    if ($scope.formData.newUser) url +='&newUser='+$scope.formData.newUser;
    if ($scope.formData.point) url +='&point='+$scope.formData.point;
    $http.put(url)
=======
    var urlr = url_defaultr+'?userId='+userId;
    if ($scope.formData.newUser) urlr +='&newUser='+$scope.formData.newUser;
    if ($scope.formData.point) urlr +='&point='+$scope.formData.point;
    $http.put(urlr)
>>>>>>> 8476547c998c7c331cca8b8084493b161430f7ab
      .success(function(data){
        $scope.formData = {};
      })
      .error(function(data){
        console.log('Error: ' + data);
      });
  };
<<<<<<< HEAD

  $scope.debitRank = function(userId) {
    var url = url_default+'/debit?userId='+userId+'&rank='+$scope.formData.rank;
    $http.post(url)
      .success(function(data){
        $scope.formData = {};
      })
      .error(function(data){
=======
};

var friendPage = angular.module('friend-page', []);
var url_default = 'http://istim-friending.nodejitsu.com/friend';
function friendController($scope, $http) {
  $scope.formData = {};
  $http.get(url_default+'/')
    .success(function(data) {
      $scope.friends = data;
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

  $scope.createFriend = function() {
    $http.post(url_default+'/', $scope.formData)
      .success(function(data) {
        $scope.formData = {};
        console.log(data);
      })
      .error(function(data) {
>>>>>>> 8476547c998c7c331cca8b8084493b161430f7ab
        console.log('Error: ' + data);
      });
  };

<<<<<<< HEAD
  $scope.creditRank = function(userId) {
    var url = url_default+'/credit?userId='+userId+'&rank='+$scope.formData.rank;
    $http.post(url)
=======
  $scope.deleteFriend = function(friendId) {
    var url = url_default+'?userId='+friendId;
    $http.delete(url)
      .success(function(data) {
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };

  $scope.updateFriend = function(friendId) {
    var url = url_default+'?friendId='+friendId;
    if ($scope.formData.newFriend) url +='&newFriend='+$scope.formData.newFriend;
    if ($scope.formData.point) url +='&point='+$scope.formData.point;
    $http.put(url)
>>>>>>> 8476547c998c7c331cca8b8084493b161430f7ab
      .success(function(data){
        $scope.formData = {};
      })
      .error(function(data){
        console.log('Error: ' + data);
      });
  };
<<<<<<< HEAD

=======
>>>>>>> 8476547c998c7c331cca8b8084493b161430f7ab
}