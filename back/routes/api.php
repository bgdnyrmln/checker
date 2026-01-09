<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CompanyController;
use App\Http\Controllers\Api\InviteController;
use App\Http\Controllers\Api\EmployeeRegisterController;

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/invites', [InviteController::class, 'create']);
});
Route::post('/register/member', [EmployeeRegisterController::class, 'register']);
Route::get('/invites/validate/{token}', [InviteController::class, 'validateToken']);




Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register/company', [CompanyController::class, 'register']);
