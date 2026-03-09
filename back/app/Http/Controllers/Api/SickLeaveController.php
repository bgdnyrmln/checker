<?php
// app/Http/Controllers/Api/SickLeaveController.php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SickLeave;
use Illuminate\Http\Request;

class SickLeaveController extends Controller
{
    public function index(Request $request)
    {
        $sickLeaves = SickLeave::with('profile')
            ->when($request->profile_id, fn($q, $id) => $q->where('profile_id', $id))
            ->latest()
            ->get();

        return response()->json($sickLeaves);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'file'       => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:10240',
            'date_start' => 'required|date',
            'date_end'   => 'nullable|date|after_or_equal:date_start',
            'profile_id' => 'required|exists:company_user,id',
        ]);

        if ($request->hasFile('file')) {
            $validated['file'] = base64_encode(
                file_get_contents($request->file('file')->getRealPath())
            );
        }

        $sickLeave = SickLeave::create($validated);
        return response()->json($sickLeave, 201);
    }

    public function show(SickLeave $sickLeave)
    {
        return response()->json($sickLeave->load('profile'));
    }

    public function update(Request $request, SickLeave $sickLeave)
    {
        $validated = $request->validate([
            'file'       => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:5120',
            'date_start' => 'sometimes|required|date',
            'date_end'   => 'nullable|date|after_or_equal:date_start',
            'profile_id' => 'sometimes|required|exists:company_user,id',
        ]);

        if ($request->hasFile('file')) {
            $validated['file'] = file_get_contents(
                $request->file('file')->getRealPath()
            );
        }

        $sickLeave->update($validated);
        return response()->json($sickLeave);
    }

    public function destroy(SickLeave $sickLeave)
    {
        // Nullify file first to avoid any binary data issues during deletion
        $sickLeave->file = null;
        $sickLeave->save();

        $sickLeave->delete();
        return response()->json(null, 204);
    }

    public function file(SickLeave $sickLeave)
    {
        if (!$sickLeave->getRawOriginal('file')) {
            return response()->json(['message' => 'No file attached'], 404);
        }

        $binary = base64_decode($sickLeave->getRawOriginal('file'));

        $finfo    = new \finfo(FILEINFO_MIME_TYPE);
        $mimeType = $finfo->buffer($binary);

        return response($binary, 200)
            ->header('Content-Type', $mimeType)
            ->header('Content-Disposition', 'inline; filename="sick_leave_' . $sickLeave->id . '"');
    }
}
