var app = angular.module("productsList", [])
	.constant('API_URL', 'http://products.dev/api/v1/');

app.controller('productsController', function($scope, $http, API_URL) {

	//$http.get(API_URL + 'products')

      $scope.loading = true;
      $http.get(API_URL + 'products').then( function ( response ) {
        $scope.products = response.data;
      }, function ( response ) {
        // TODO: handle the error somehow
      }).finally(function() {
        // called no matter success or failure
        $scope.loading = false;
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
                    //location.reload();
                });
            } else {
                var url = API_URL + "products";
                $scope.loading = true;
                $http({
                method: 'POST',
                url: url,
                data: $.param($scope.product),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(function(response) {
                    console.log(response.data);
                    $scope.products.push({'name': response.data.name, 'price': response.data.price});
                    $scope.loading = false;
                });
            }
        
    }


	//delete product
    $scope.confirmDelete = function(id) {
        var isConfirmDelete = confirm('Do you want to delete this product?');
        $scope.loading = true;
        if (isConfirmDelete) {
            $http({
                method: 'DELETE',
                url: API_URL + 'products/' + id
            }).then(function(response) {
                        console.log(response.data);
                        $scope.products.splice(response, 1);
                        $scope.loading = false;
                    });
        } else {
            return false;
        }
    };

});