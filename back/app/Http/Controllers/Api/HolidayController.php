<?php
// app/Http/Controllers/HolidayController.php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Holiday;
use Illuminate\Http\Request;

class HolidayController extends Controller
{
    public function index()
    {
        $holidays = Holiday::with('profile')->latest()->get();
        return response()->json($holidays);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'content'     => 'required|string|max:1000',
            'date_start'  => 'required|date',
            'date_end'    => 'nullable|date|after_or_equal:date_start',
            'profile_id'  => 'required|exists:company_user,id',
            'is_approved' => 'boolean',
        ]);

        $holiday = Holiday::create($validated);
        return response()->json($holiday, 201);
    }

    public function show(Holiday $holiday)
    {
        return response()->json($holiday->load('profile'));
    }

    public function update(Request $request, Holiday $holiday)
    {
        $validated = $request->validate([
            'content'     => 'sometimes|required|string|max:1000',
            'date_start'  => 'sometimes|required|date',
            'date_end'    => 'nullable|date|after_or_equal:date_start',
            'profile_id'  => 'sometimes|required|exists:profiles,id',
            'is_approved' => 'boolean',
        ]);

        $holiday->update($validated);
        return response()->json($holiday);
    }

    public function destroy(Holiday $holiday)
    {
        $holiday->delete();
        return response()->json(null, 204);
    }



}
