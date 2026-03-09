<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CompanyController;
use App\Http\Controllers\Api\CompanyUserController;
use App\Http\Controllers\Api\InviteController;
use App\Http\Controllers\Api\EmployeeRegisterController;
use App\Http\Controllers\Api\AttendanceController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ShiftController;
use App\Http\Controllers\Api\AnnouncementController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\SickLeaveController;
use App\Http\Controllers\Api\HolidayController;



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {
    Route::put('/user', [UserController::class, 'update']);
    Route::get('/attendance/status/{profile_id}', [AttendanceController::class, 'status']);
    Route::post('/attendance/check-in/{profile_id}', [AttendanceController::class, 'checkIn']);
    Route::post('/attendance/check-out/{profile_id}', [AttendanceController::class, 'checkOut']);
    Route::get('/attendance/team/employees/{company_id}', [AttendanceController::class, 'employeeTime']);
    Route::get('attendance/personal/{profile_id}', [AttendanceController::class, 'personalTime']);
    Route::post('/invites/{company_id}', [InviteController::class, 'create']);
    Route::get('/companies/{company}/invites', [InviteController::class, 'index']);
    Route::get('user/profiles', [UserController::class, 'profiles']);
    Route::post('/shifts', [ShiftController::class, 'store']);
    Route::delete('/shifts/{shift}', [ShiftController::class, 'destroy']);
    Route::put('/shifts/{shift}', [ShiftController::class, 'update']);
    Route::get('/shifts/schedule/{profile}', [ShiftController::class, 'personal']);
    Route::get('/shifts/company/{company}', [ShiftController::class, 'index']);
    Route::post('/announcements', [AnnouncementController::class, 'store']);
    Route::get('/companies/{company}/employees', [CompanyUserController::class, 'index']);
    Route::put('/companies/{company}/employees/{employee}', [CompanyUserController::class, 'edit']);
    Route::delete('/companies/{company}/employees/{employee}', [CompanyUserController::class, 'destroy']);
    Route::get('/companies/{company}/dashboard', [DashboardController::class, 'show']);
    Route::get('/companies/{company}', [CompanyController::class, 'show']);
    Route::put('/companies/{company}', [CompanyController::class, 'update']);
    Route::get('/attendance/has-shift/{profile}', [AttendanceController::class, 'hasShift']);
    Route::post('/connect/member', [EmployeeRegisterController::class, 'connect']);
    Route::get('/sick-leaves', [SickLeaveController::class, 'index']);
    Route::post('/sick-leaves', [SickLeaveController::class, 'store']);
    Route::get('/sick-leaves/{sickLeave}', [SickLeaveController::class, 'show']);
    Route::put('/sick-leaves/{sickLeave}', [SickLeaveController::class, 'update']);
    Route::delete('/sick-leaves/{sickLeave}', [SickLeaveController::class, 'destroy']);
    Route::get('/sick-leaves/{sickLeave}/file', [SickLeaveController::class, 'file']);
    Route::apiResource('holidays', HolidayController::class);
});

Route::post('/register/member', [EmployeeRegisterController::class, 'register']);
Route::get('/invites/validate/{token}', [InviteController::class, 'validateToken']);
Route::post('/register/company', [CompanyController::class, 'register']);
Route::get('/announcements', [AnnouncementController::class, 'index']);
