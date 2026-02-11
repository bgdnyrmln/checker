<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CompanyUser;
use App\Models\Shift;
use App\Models\TimeLog;
use App\Models\Invite;

class DashboardController extends Controller
{
    public function show($companyId, Request $request)
    {
        // Ensure user belongs to this company
        $request->user()
            ->companies()
            ->where('company_id', $companyId)
            ->firstOrFail();

        $employees = CompanyUser::where('company_id', $companyId)->count();

        $shiftsThisWeek = Shift::whereHas('companyUser', fn($q) =>
            $q->where('company_id', $companyId)
        )
        ->whereBetween('shift_date', [now()->startOfWeek(), now()->endOfWeek()])
        ->count();

        $attendanceToday = TimeLog::whereHas('profile', fn($q) =>
            $q->where('company_id', $companyId)
        )
        ->whereDate('created_at', now())
        ->distinct('profile_id')
        ->count('profile_id');


        $recentShifts = Shift::with('companyUser.user')
            ->whereHas('companyUser', fn($q) =>
                $q->where('company_id', $companyId)
            )
            ->latest()
            ->take(5)
            ->get();

        return response()->json([
            'stats' => [
                'employees' => $employees,
                'shiftsThisWeek' => $shiftsThisWeek,
                'attendanceToday' => $attendanceToday,
            ],
            'recentShifts' => $recentShifts,
        ]);
    }
}
