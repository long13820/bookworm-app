<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')-> group(function (){
    Route::get('user', [AuthController])
});


// Route::get('/onSaleBook');

// Route::get('/recommandBook');

// Route::get('/popularBook');

// Route::get('/popularBook');

// Route::get('/book/{id}');

// Route::get('/filterby');


