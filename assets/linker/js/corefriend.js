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
        console.log('Error: ' + data);
      });
  };

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
      .success(function(data){
        $scope.formData = {};
      })
      .error(function(data){
        console.log('Error: ' + data);
      });
  };

}