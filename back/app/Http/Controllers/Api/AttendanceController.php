<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TimeLog;
use Illuminate\Http\Request;
use App\Models\Shift;
use Carbon\Carbon;
use App\Models\CompanyUser;

class AttendanceController extends Controller
{
    public function status(Request $request, $profile_id)
    {
        $log = TimeLog::where('profile_id', $profile_id)
            ->whereNull('checked_out_at')
            ->latest()
            ->first();

        return response()->json([
            'checked_in' => (bool) $log,
            'checked_in_at' => $log?->checked_in_at,
        ]);
    }

    public function checkIn(Request $request, $profile_id)
    {
        // 1️⃣ check if user has a shift today
        $hasShiftToday = Shift::where('profile_id', $profile_id)
            ->whereDate('shift_date', now()->toDateString())
            ->exists();

        if (! $hasShiftToday) {
            abort(403, 'No shift scheduled for today');
        }

        // 2️⃣ prevent double check-in
        $exists = TimeLog::where('profile_id', $profile_id)
            ->whereNull('checked_out_at')
            ->exists();

        if ($exists) {
            abort(409, 'Already checked in');
        }

        // 3️⃣ check in
        TimeLog::create([
            'profile_id' => $profile_id,
            'checked_in_at' => now(),
        ]);

        return response()->json(['message' => 'Checked in']);
    }

    public function checkOut(Request $request, $profile_id)
    {
        $log = TimeLog::where('profile_id', $profile_id)
            ->whereNull('checked_out_at')
            ->latest()
            ->first();

        if (! $log) {
            abort(409, 'Not checked in');
        }

        $log->update([
            'checked_out_at' => now(),
        ]);

        return response()->json(['message' => 'Checked out']);
    }

    public function personalTime(Request $request, $profile_id)
    {
        // Fetch timelogs for the given profile
        $timeLogs = TimeLog::where('profile_id', $profile_id)
            ->whereBetween('checked_in_at', [
                Carbon::parse($request->query('start_date'))->startOfDay(),
                Carbon::parse($request->query('end_date'))->endOfDay()
            ])
            ->orderBy('checked_in_at')
            ->get();

        $userProfile = CompanyUser::where('id', $profile_id)->first();
        // Group logs by date
        $dailyLogs = $timeLogs->groupBy(function ($log) {
            return $log->checked_in_at->toDateString();
        });

        $startDate = Carbon::parse($request->query('start_date'))->startOfDay();
        $endDate   = Carbon::parse($request->query('end_date'))->endOfDay();

        $period = new \DatePeriod(
            $startDate,
            new \DateInterval('P1D'),
            $endDate->copy()->addDay()
        );

        $daily = [];

        foreach ($period as $date) {
            $date = Carbon::instance($date);
            $dayKey = $date->toDateString();

            $logs = $dailyLogs[$dayKey] ?? collect();

            $totalSeconds = $logs->reduce(function ($carry, $log) {
                $out = $log->checked_out_at ?? now();
                return $carry + $log->checked_in_at->diffInSeconds($out);
            }, 0);

            $daily[] = [
                'date' => $date->format('d-m-Y'),
                'checked_in_at' => $logs->first()?->checked_in_at?->format('H:i'),
                'checked_out_at' => $logs->last()?->checked_out_at?->format('H:i'),
                'total_time_seconds' => $totalSeconds,
            ];
        }

        return response()->json([
            'profile_id' => $profile_id,
            'daily' => $daily,
            'hourly_pay' => $userProfile->hourly_pay,
            'total_time_seconds' => collect($daily)->sum('total_time_seconds'),
            'first_checked_in' => $timeLogs->first()?->checked_in_at?->format('H:i'),
            'last_checked_out' => $timeLogs->last()?->checked_out_at?->format('H:i'),
        ]);
    }




    public function employeeTime(Request $request, $company_id)
    {
        $startDate = Carbon::parse($request->query('start_date'))->startOfDay();
        $endDate   = Carbon::parse($request->query('end_date'))->endOfDay();

        // Check if the user belongs to the requested company
        $company = $request->user()->companies()->wherePivot('company_id', $company_id)->first();
        if (!$company) {
            abort(403, 'Unauthorized');
        }

        // Fetch all company_user profiles for this company
        $profiles = \App\Models\CompanyUser::where('company_id', $company_id)
            ->with(['user', 'timeLogs' => function ($query) use ($startDate, $endDate) {
                $query->whereBetween('checked_in_at', [$startDate, $endDate])
                    ->orderBy('checked_in_at');
            }])
            ->get();

        // Group logs per user
        $employees = $profiles->groupBy('user_id')->map(function ($userProfiles) use ($startDate, $endDate) {
            $user = $userProfiles->first()->user;

            $dailyLogs = [];

            // Loop through each day in the range
            $period = new \DatePeriod($startDate, new \DateInterval('P1D'), $endDate->copy()->addDay());
            foreach ($period as $date) {
                $date = Carbon::instance($date);
                $dayKey = $date->toDateString();

                // Collect all logs for this user across all profiles for this day
                $logs = collect();
                foreach ($userProfiles as $profile) {
                    $profileLogs = $profile->timeLogs->filter(fn($log) => $log->checked_in_at->toDateString() === $dayKey);
                    $logs = $logs->merge($profileLogs);
                }

                $totalSeconds = $logs->reduce(fn($carry, $log) => $carry + $log->checked_in_at->diffInSeconds($log->checked_out_at ?? now()), 0);

                $dailyLogs[] = [
                    'date' => $date->format('d-m-Y'),
                    'checked_in_at' => $logs->first()?->checked_in_at?->format('H:i'),
                    'checked_out_at' => $logs->last()?->checked_out_at?->format('H:i'),
                    'total_time_seconds' => $totalSeconds,
                ];
            }

            return [
                'id' => $user->id,
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'hourly_pay' => $userProfiles->first()->hourly_pay ?? 0,
                'email' => $user->email,
                'total_time_seconds' => collect($dailyLogs)->sum('total_time_seconds'),
                'daily' => $dailyLogs,
            ];
        })->values(); // reset keys

        return response()->json($employees);
    }

    public function hasShift($profile_id)
    {
        $hasShift = Shift::where('profile_id', $profile_id)
                        ->whereDate('shift_date', now()->toDateString())
                        ->exists();

        return response()->json(['has_shift' => $hasShift]);
    }

}

