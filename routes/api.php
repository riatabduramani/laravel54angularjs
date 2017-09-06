<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//Ovde gi definiram routes za API
Route::group(['prefix' => 'v1'], function() {

	Route::get('/products', 'Api\V1\ApiController@index');
	Route::get('/products/{id}', 'Api\V1\ApiController@show');
	Route::post('/products', 'Api\V1\ApiController@store');
	Route::put('/products/{id}', 'Api\V1\ApiController@update');
	Route::delete('/products/{id}', 'Api\V1\ApiController@destroy');

});
