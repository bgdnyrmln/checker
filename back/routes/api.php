<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CompanyController;
use App\Http\Controllers\Api\InviteController;
use App\Http\Controllers\Api\EmployeeRegisterController;
use App\Http\Controllers\Api\AttendanceController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ShiftController;
use App\Http\Controllers\Api\AnnouncementController;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/attendance/status/{profile_id}', [AttendanceController::class, 'status']);
    Route::post('/attendance/check-in/{profile_id}', [AttendanceController::class, 'checkIn']);
    Route::post('/attendance/check-out/{profile_id}', [AttendanceController::class, 'checkOut']);
    Route::get('/attendance/team/employees/{company_id}', [AttendanceController::class, 'employeeTime']);
    Route::get('attendance/personal/{profile_id}', [AttendanceController::class, 'personalTime']);
    Route::post('/invites', [InviteController::class, 'create']);
    Route::get('/profile', [UserController::class, 'profile']);
    Route::get('user/profiles', [UserController::class, 'profiles']);
    Route::post('/shifts', [ShiftController::class, 'store']);
    Route::put('/shifts/{shift}', [ShiftController::class, 'update']);
    Route::get('/shifts/company/{company}', [ShiftController::class, 'index']);
    Route::post('/announcements', [AnnouncementController::class, 'store']);
});

Route::post('/register/member', [EmployeeRegisterController::class, 'register']);
Route::get('/invites/validate/{token}', [InviteController::class, 'validateToken']);
Route::post('/register/company', [CompanyController::class, 'register']);
Route::get('/announcements', [AnnouncementController::class, 'index']);
