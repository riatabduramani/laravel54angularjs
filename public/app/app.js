var app = angular.module("productsList", [])
	.constant('API_URL', 'http://products.dev/api/v1/');

app.controller('productsController', function($scope, $http, API_URL) {

	$http.get(API_URL + 'products')
		.then(function(response) {
			$scope.products = response.data;
		});

	//show modal form of products
    $scope.toggle = function(modalshow, id) {
        $scope.modalshow = modalshow;

        switch (modalshow) {
            case 'add':
                $scope.form_title = "Add New";
                break;
            case 'edit':
                $scope.form_title = "Product Detail";
                $scope.id = id;
                $scope.form_type = "edit";
                $http.get(API_URL + 'products/' + id)
                        .then(function(response) {
                            console.log(response);
                            $scope.product = response.data;
                        });
                break;
            default:
                break;
        }
        console.log(id);
        $('#productModal').modal('show');
    }

    $scope.save = function(modalshow, id) {
            if ($scope.form_type == 'edit'){
                var url = API_URL + "products/" + id;
                $http({
                method: 'PUT',
                url: url,
                data: $.param($scope.product),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(function(response) {
                    console.log(response.data);
                    location.reload();
                });
            } else {
                var url = API_URL + "products";
                $http({
                method: 'POST',
                url: url,
                data: $.param($scope.product),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(function(response) {
                    console.log(response.data);
                    location.reload();
                });
            }
        
    }


	//delete product
    $scope.confirmDelete = function(id) {
        var isConfirmDelete = confirm('Do you want to delete this product?');
        if (isConfirmDelete) {
            $http({
                method: 'DELETE',
                url: API_URL + 'products/' + id
            }).then(function(response) {
                        console.log(response.data);
                        location.reload();
                    });
        } else {
            return false;
        }
    };

});