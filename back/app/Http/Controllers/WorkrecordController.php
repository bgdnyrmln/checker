<?php

namespace App\Http\Controllers;

use App\Models\WorkRecord;
use Illuminate\Http\Request;
use Carbon\Carbon;

class WorkRecordController extends Controller
{
    // Employee check-in
    public function checkIn(Request $request)
    {
        $user = $request->user();

        $record = WorkRecord::firstOrCreate(
            [
                'user_id' => $user->id,
                'date' => now()->format('Y-m-d'),
            ]
        );

        // Only set check_in if not already set
        if (!$record->check_in) {
            $record->check_in = now();
            $record->save();
        }

        return response()->json($record);
    }

    // Employee check-out
    public function checkOut(Request $request)
    {
        $user = $request->user();

        $record = WorkRecord::where('user_id', $user->id)
                    ->where('date', now()->format('Y-m-d'))
                    ->firstOrFail();

        if (!$record->check_out) {
            $record->check_out = now();

            // Calculate worked hours as decimal (e.g., 8.25)
            $minutes = Carbon::parse($record->check_in)->diffInMinutes($record->check_out);
            $record->worked_hours = gmdate('H:i', $minutes * 60); // H:i format

            $record->save();
        }

        return response()->json($record);
    }
}
