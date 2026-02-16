<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Shift;
use App\Models\CompanyUser;
use Illuminate\Http\Request;

class ShiftController extends Controller
{

    public function index(Request $request, $companyId)
    {
        // Validate optional date range
        $data = $request->validate([
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date',
        ]);

        $start = $data['start_date'] ?? null;
        $end = $data['end_date'] ?? null;

        // Fetch shifts for this company with companyUser, user, company
        $shifts = Shift::with(['companyUser.user', 'companyUser.company'])
            ->whereHas('companyUser', function ($q) use ($companyId) {
                $q->where('company_id', $companyId);
            });

        // Filter by date range
        if ($start) {
            $shifts->where('shift_date', '>=', $start);
        }

        if ($end) {
            $shifts->where('shift_date', '<=', $end);
        }

        return response()->json($shifts->get());
    }

    public function personal(Request $request, $profileId)
    {
        $shifts = Shift::with(['companyUser.user', 'companyUser.company'])
            ->where('profile_id', $profileId)
            ->get();

        return response()->json($shifts);
    }

    // manager creates shift
    public function store(Request $request)
    {
        $data = $request->validate([
            'profile_id' => 'required|exists:company_user,id',
            'shift_date' => 'required|date',
            'starts_at' => 'required|date_format:H:i',
            'ends_at' => 'required|date_format:H:i|after:starts_at',
        ]);

        $companyUser = CompanyUser::findOrFail($data['profile_id']);

        $shift = Shift::create($data);

        return response()->json($shift, 201);
    }

    // manager updates shift
    public function update(Request $request, Shift $shift)
    {
        $shift->update($request->only([
            'shift_date',
            'starts_at',
            'ends_at',
        ]));

        return response()->json($shift);
    }
}
