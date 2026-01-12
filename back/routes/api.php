<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CompanyController;
use App\Http\Controllers\Api\InviteController;
use App\Http\Controllers\Api\EmployeeRegisterController;
use App\Http\Controllers\Api\AttendanceController;


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/attendance/status', [AttendanceController::class, 'status']);
    Route::post('/attendance/check-in', [AttendanceController::class, 'checkIn']);
    Route::post('/attendance/check-out', [AttendanceController::class, 'checkOut']);
});
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/invites', [InviteController::class, 'create']);
});
Route::post('/register/member', [EmployeeRegisterController::class, 'register']);
Route::get('/invites/validate/{token}', [InviteController::class, 'validateToken']);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/register/company', [CompanyController::class, 'register']);
