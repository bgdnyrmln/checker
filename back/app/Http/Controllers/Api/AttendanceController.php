<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TimeLog;
use Illuminate\Http\Request;

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
}
