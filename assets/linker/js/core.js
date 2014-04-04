var rankPage = angular.module('rank-page', []);
var url_default = 'http://localhost:1337/rank';
var url_games = 'http://istim-games.jit.su/game';
var url_users = 'http://istim-user.jit.su/';
function mainController($scope, $http) {
  $scope.formData = {};
  $http.get(url_default+'/')
    .success(function(data) {
      $scope.ranks = data;
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

  $scope.createRank = function() {
    $http.post(url_default+'/', $scope.formData)
      .success(function(data) {
        $scope.formData = {};
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };

  $scope.deleteRank = function(userId) {
    var url = url_default+'?userId='+userId;
    $http.delete(url)
      .success(function(data) {
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };

  $scope.updateRank = function(userId) {
    var url = url_default+'?userId='+userId;
    if ($scope.formData.newUser) url +='&newUser='+$scope.formData.newUser;
    if ($scope.formData.point) url +='&point='+$scope.formData.point;
    $http.put(url)
      .success(function(data){
        $scope.formData = {};
      })
      .error(function(data){
        console.log('Error: ' + data);
      });
  };

  $scope.increaseRank = function(userId) {
    var url = url_default+'/credit?userId='+userId+'&rank='+$scope.formData.rank;
    $http.post(url)
      .success(function(data){
        $scope.formData = {};
      })
      .error(function(data){
        console.log('Error: ' + data);
      });
  };

  $scope.decreaseRank = function(userId) {
    var url = url_default+'/debit?userId='+userId+'&rank='+$scope.formData.rank;
    $http.post(url)
      .success(function(data){
        $scope.formData = {};
      })
      .error(function(data){
        console.log('Error: ' + data);
      });
  };

}