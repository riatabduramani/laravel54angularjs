<!DOCTYPE html>
<html lang="en-US" ng-app="productsList">
<head>
	<title>Products</title>
	<link rel="stylesheet" type="text/css" href="/css/app.css">
	<script src="js/app.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<body>
<div class="col-md-12">
	
	<div>
		<h1>Products</h1>
	</div>

	<div ng-controller="productsController">

			<div class="col-md-6">
				<table class="table" ng-table="tableParams">
                    
    <i class="fa fa-spinner fa-spin" style="font-size:24px" ng-show="loading"></i>
					<thead>
						<tr>
							<th>Product name</th>
							<th>Price</th>
							 <th><button id="btn-add" class="btn btn-primary btn-xs" ng-click="toggle('add', 0)">Add New</button></th>
						</tr>
					</thead>
					<tbody>
						<tr ng-repeat="product in products">
							<td>@{{product.name}}</td>
							<td>@{{product.price}}</td>
							<td>
								<button class="btn btn-success btn-xs" ng-click="toggle('edit', product.id)">Edit</button>
                         		<button class="btn btn-danger btn-xs" ng-click="confirmDelete(product.id)">Delete</button>
							</td>
						</tr>
					</tbody>
				</table>	
			</div>

  <!-- START -->
  	<!-- Modal (Pop up when detail button clicked) -->
            <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                            <h4 class="modal-title" id="myModalLabel">@{{form_title}}</h4>
                        </div>
                        <div class="modal-body">
                            <form name="frmProducts" class="form-horizontal" novalidate="">

                                <div class="form-group error">
                                    <label for="inputEmail3" class="col-sm-3 control-label">Product name</label>
                                    <div class="col-sm-9">
                                        <input type="text" class="form-control has-error" id="name" name="name" placeholder="Product name" value="@{{name}}" ng-model="product.name" ng-required="true">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="inputEmail3" class="col-sm-3 control-label">Price</label>
                                    <div class="col-sm-9">
                                        <input type="text" class="form-control" id="price" name="price" placeholder="Price" value="@{{price}}" ng-model="product.price" ng-required="true">
                                    </div>
                                </div>

                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" id="btn-save" ng-click="save(modalstate, id)" ng-disabled="frmProducts.$invalid">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
  <!-- END -->
</div>
</div>
	<!--AngularJS-->
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js"></script>
	<script src="/app/app.js"></script>
</body>
</html>