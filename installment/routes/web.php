<?php

use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ServerController;
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
    return view('layouts.app');
});


// customer auth
Route::get('/customers/register', [CustomerController::class, 'register']);
Route::post('/customers/register', [CustomerController::class, 'signUp'])->name('customers.sign_up');
Route::get('/customers/login', [CustomerController::class, 'login']);
Route::post('/customers/login', [CustomerController::class, 'signIn'])->name('customers.sign_in');

// server auth
Route::get('/servers/register', [ServerController::class, 'register']);
Route::post('/servers/register', [ServerController::class, 'signUp'])->name('servers.sign_up');
Route::get('/servers/login', [ServerController::class, 'login']);
Route::post('/servers/login', [ServerController::class, 'signIn'])->name('servers.sign_in');