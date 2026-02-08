<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CompanyUser;
use Illuminate\Http\Request;


class CompanyUserController extends Controller
{
    public function index(Request $request, $companyId)
    {
        // auth check
        $allowed = $request->user()
            ->companies()
            ->wherePivot('company_id', $companyId)
            ->exists();

        if (!$allowed) {
            abort(403);
        }

        return CompanyUser::where('company_id', $companyId)
            ->with('user:id,first_name,last_name,email')
            ->get()
            ->map(fn ($profile) => [
                'id' => $profile->id,
                'user_id' => $profile->user_id,
                'first_name' => $profile->user->first_name,
                'last_name' => $profile->user->last_name,
                'email' => $profile->user->email,
                'role' => $profile->role,
            ]);
    }
}
