<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TimeLog;
use Illuminate\Http\Request;
use Carbon\Carbon;

class AttendanceController extends Controller
{
    public function status(Request $request)
    {
        $log = TimeLog::where('user_id', $request->user()->id)
            ->whereNull('checked_out_at')
            ->latest()
            ->first();

        return response()->json([
            'checked_in' => (bool) $log,
            'checked_in_at' => $log?->checked_in_at,
        ]);
    }

    public function checkIn(Request $request)
    {
        $exists = TimeLog::where('user_id', $request->user()->id)
            ->whereNull('checked_out_at')
            ->exists();

        if ($exists) {
            abort(409, 'Already checked in');
        }

        TimeLog::create([
            'user_id' => $request->user()->id,
            'checked_in_at' => now(),
        ]);

        return response()->json(['message' => 'Checked in']);
    }

    public function checkOut(Request $request)
    {
        $log = TimeLog::where('user_id', $request->user()->id)
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

    public function personalTime(Request $request)
    {
        $date = $request->query('date', now()->toDateString());
        $employee = $request->user()->id;
        $timeLogs = TimeLog::where('user_id', $employee)
            ->whereDate('checked_in_at', $date)
            ->get();
        return [
            'date' => $date,
            'checked_in_at' => $timeLogs->first()?->checked_in_at,
            'checked_out_at' => $timeLogs->last()?->checked_out_at,
            'total_time_seconds' => $timeLogs->reduce(function ($carry, $log) {
                $checkedInAt = $log->checked_in_at ?? now();
                $checkedOutAt = $log->checked_out_at ?? now();
                return $carry + $checkedInAt->diffInSeconds($checkedOutAt);
            },0)
        ];
    }

    public function employeeTime(Request $request)
    {
        $startDate = Carbon::parse($request->query('start_date'))->startOfDay();
        $endDate   = Carbon::parse($request->query('end_date'))->endOfDay();

        $employees = $request->user()->company->users()
            ->with(['timeLogs' => function ($query) use ($startDate, $endDate) {
                $query->whereBetween('checked_in_at', [$startDate, $endDate])
                    ->orderBy('checked_in_at');
            }])
            ->get();

        $data = $employees->map(function ($employee) use ($startDate, $endDate) {

            // Group logs by date
            $dailyLogs = $employee->timeLogs->groupBy(function ($log) {
                return $log->checked_in_at->toDateString();
            });

            // Build full date range
            $period = new \DatePeriod($startDate, new \DateInterval('P1D'), $endDate->copy()->addDay());

            $daily = [];

            foreach ($period as $date) {
                $date = Carbon::instance($date); // <-- FIX HERE
                $dayKey = $date->toDateString();

                $logs = $dailyLogs[$dayKey] ?? collect();

                $totalSeconds = $logs->reduce(function ($carry, $log) {
                    $out = $log->checked_out_at ?? now();
                    return $carry + $log->checked_in_at->diffInSeconds($out);
                }, 0);

                $daily[] = [
                    'date' => $date->format('d-m-Y'), // formatted
                    'checked_in_at' => $logs->first()?->checked_in_at?->format('H:i'),
                    'checked_out_at' => $logs->last()?->checked_out_at?->format('H:i'),
                    'total_time_seconds' => $totalSeconds,
                ];
            }

            return [
                'id' => $employee->id,
                'first_name' => $employee->first_name,
                'last_name' => $employee->last_name,
                'email' => $employee->email,

                'checked_in_at' => $employee->timeLogs->first()?->checked_in_at?->format('H:i'),
                'checked_out_at' => $employee->timeLogs->last()?->checked_out_at?->format('H:i'),
                'total_time_seconds' => collect($daily)->sum('total_time_seconds'),

                'daily' => $daily,
            ];
        });

        return response()->json($data);
    }

}

