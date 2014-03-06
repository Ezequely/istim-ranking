var ranks = angular.module('ranks', []);

function mainController($scope, $http) {
	$scope.formData = {};

	$http.get('localhost:1337/rank')
		.success(function(data);
		console.log(data);
	})
		.error(function(data) {
			console.log('error: ' + data);
		});

		// when submitting the add form, send the text to the node API
	$scope.createTodo = function() {
		$http.post('/rank/create', $scope.formData)
			.success(function(data) {
				$scope.formData = {}; // clear the form so our user is ready to enter another
				$scope.todos = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};
}