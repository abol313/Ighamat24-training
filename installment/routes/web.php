<?php

use App\Http\Controllers\CartInstallmentController;
use App\Http\Controllers\CustomerCartController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ServerCartController;
use App\Http\Controllers\ServerController;
use App\Http\Controllers\ServerInstallmentController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\ServiceInstallmentConditionController;
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
Route::get('/customers/register', [CustomerController::class, 'register'])->name('customers.register');
Route::post('/customers/register', [CustomerController::class, 'signUp'])->name('customers.sign_up');
Route::get('/customers/login', [CustomerController::class, 'login'])->name('customers.login');
Route::post('/customers/login', [CustomerController::class, 'signIn'])->name('customers.sign_in');
Route::get('/customers/logout', [CustomerController::class, 'logout'])->name('customers.logout');


// server auth
Route::get('/servers/register', [ServerController::class, 'register'])->name('servers.register');
Route::post('/servers/register', [ServerController::class, 'signUp'])->name('servers.sign_up');
Route::get('/servers/login', [ServerController::class, 'login'])->name('servers.login');
Route::post('/servers/login', [ServerController::class, 'signIn'])->name('servers.sign_in');
Route::get('/servers/logout', [ServerController::class, 'logout'])->name('servers.logout');


// service resoure routes
Route::get('/services/me', [ServiceController::class, 'indexMyServices'])->name('services.index_my_services');
Route::resource('services', ServiceController::class);

// service installment conditions resource routes
Route::resource('services.installment_conditions', ServiceInstallmentConditionController::class);

// customer carts
Route::resource('customers.carts', CustomerCartController::class);

// server carts
Route::get('/servers/{server}/carts', [ServerCartController::class, 'index'])->name('servers.carts.index');
Route::get('/servers/{server}/carts/{cart}', [ServerCartController::class, 'show'])->name('servers.carts.show');
Route::post('/servers/{server}/carts/{cart}/accept', [ServerCartController::class, 'accept'])->name('servers.carts.accept');
Route::post('/servers/{server}/carts/{cart}/reject', [ServerCartController::class, 'reject'])->name('servers.carts.reject');

// customer cart installments
Route::get('/carts/{cart}/installments', [CartInstallmentController::class, 'index'])->name('carts.installments.index');
Route::get('/carts/{cart}/installments/{installment}', [CartInstallmentController::class, 'show'])->name('carts.installments.show');
Route::post('/carts/{cart}/installments/{installment}/pay', [CartInstallmentController::class, 'pay'])->name('carts.installments.pay');
Route::post('/carts/{cart}/installments/{installment}/unpay', [CartInstallmentController::class, 'unpay'])->name('carts.installments.unpay');

// server cart pending installments
Route::get('/servers/{server}/installments', [ServerInstallmentController::class, 'index'])->name('servers.installments.index');
Route::get('/servers/{server}/installments/{installment}', [ServerInstallmentController::class, 'show'])->name('servers.installments.show');
Route::post('/servers/{server}/installments/{installment}/accept', [ServerInstallmentController::class, 'accept'])->name('servers.installments.accept');
