<?php

use App\Http\Controllers\CustomerController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


// customer auth
Route::get('/customers/register', [CustomerController::class, 'register']);
Route::post('/customers/register', [CustomerController::class, 'signUp'])->name('customers.sign_up');
Route::get('/customers/login', [CustomerController::class, 'login']);
Route::post('/customers/login', [CustomerController::class, 'signIn'])->name('customers.sign_in');