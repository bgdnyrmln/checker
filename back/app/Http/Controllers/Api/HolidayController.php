<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Holiday;
use App\Models\CompanyUser;
use Illuminate\Http\Request;

class HolidayController extends Controller
{
    public function index(Request $request)
    {
        $profileId = $request->query('profile_id');

        $holidays = Holiday::where('profile_id', $profileId)
            ->orderBy('date_start', 'desc')
            ->get();

        return response()->json($holidays);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'content'    => 'required|string|max:1000',
            'date_start' => 'required|date',
            'date_end'   => 'nullable|date|after_or_equal:date_start',
            'profile_id' => 'required|exists:company_user,id',
        ]);

        $validated['is_approved'] = false;

        $holiday = Holiday::create($validated);

        return response()->json($holiday, 201);
    }

    public function show(Holiday $holiday)
    {
        return response()->json($holiday);
    }

    public function update(Request $request, Holiday $holiday)
    {
        $validated = $request->validate([
            'content'     => 'sometimes|required|string|max:1000',
            'date_start'  => 'sometimes|required|date',
            'date_end'    => 'nullable|date|after_or_equal:date_start',
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

    /**
     * Manager: fetch all holidays for a company
     */
    public function companyIndex(Request $request, $company_id)
    {
        $profileIds = CompanyUser::where('company_id', $company_id)
            ->pluck('id');

        $holidays = Holiday::whereIn('profile_id', $profileIds)
            ->with(['profile.user'])
            ->orderBy('date_start', 'desc')
            ->get()
            ->map(fn($h) => [
                'id'          => $h->id,
                'profile_id'  => $h->profile_id,
                'first_name'  => $h->profile->user->first_name,
                'last_name'   => $h->profile->user->last_name,
                'content'     => $h->content,
                'date_start'  => $h->date_start,
                'date_end'    => $h->date_end,
                'is_approved' => $h->is_approved,
            ]);

        return response()->json($holidays);
    }

    /**
     * Manager: approve a holiday
     */
    public function approve(Holiday $holiday)
    {
        $holiday->update(['is_approved' => true]);

        return response()->json($holiday);
    }
}