app.controller('productsController', function($scope, $http, API_URL) {
	$http.get(API_URL + 'products')
		.then(function(response) {
			$scope.products = response;
		});
});