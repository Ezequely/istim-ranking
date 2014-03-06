var profPage = angular.module('profPage', []);

function mainController($scope, $http) {
	$scope.formData = {};

	// when landing on the page, get all publications and show them
	$http.get('http://istim-ranking.nodejitsu.com/rank')
		.success(function(data) {
			$scope.pubs = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

}