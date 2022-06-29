<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookController;
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


/*
|--------------------------------------------------------------------------
| User API Routes
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')-> group(function (){
    Route::get('user', [AuthController::class,'user']);
    Route::get('logout',[AuthController::class,'logout']);
});


Route::post('login',[AuthController::class,'login']);

Route::post('register',[AuthController::class,'register']);


/*
|--------------------------------------------------------------------------
| Book API Routes
|--------------------------------------------------------------------------
*/

Route::get('books/getOnSaleBooks',[BookController::class,'getOnSaleBooks']);

Route::get('books/getRecommendedBooks',[BookController::class,'getRecommendedBooks']);

Route::get('books/getPopularBook',[BookController::class,'getPopularBooks']);

Route::get('/search',[BookController::class,'search']);

Route::get('categories',[BookController::class,'getAllCategories']);

Route::get('authors',[BookController::class,'getAllAuthors']);

Route:post('books/{id}/reviews',[BookController::class,'createBookReview']);

Route::get('books/{id}', [BookController::class,'get'])












