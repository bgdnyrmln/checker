<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Invite;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class InviteController extends Controller
{

    public function index(Request $request, $company)
    {
        $user = $request->user();

        // Check if the user belongs to the requested company
        $companyProfile = $user->profiles()
            ->where('role', 'manager')
            ->where('company_id', $company)
            ->first();

        if (!$companyProfile) {
            abort(403, 'Unauthorized for this company.');
        }

        // Return only unused, not expired invites for this company
        return Invite::where('company_id', $company)
            ->whereNull('used_at')
            ->where('expires_at', '>', now())
            ->latest()
            ->get();
    }




    public function create(Request $request, $company_id)
    {
        $user = $request->user();
        $companyProfile = $user->profiles()->where('role', 'manager')->first();

        if (!$companyProfile) {
            abort(403, 'You are not manager of any company.');
        }
        $invite = Invite::create([
            'company_id' => $company_id,
            'token' => Str::uuid(),
            'expires_at' => now()->addDays(7),
        ]);

        return response()->json([
            'link' => config('app.frontend_url') . '/auth/register?token=' . $invite->token
        ]);
    }

    public function validateToken($token)
    {
        $invite = Invite::where('token', $token)
                        ->whereNull('used_at')
                        ->first();

        if (!$invite) {
            return response()->json([
                'message' => 'Invalid or expired invite token.'
            ], 403);
        }

        if (!$invite->company) {
            return response()->json([
                'message' => 'Invite is not associated with any company.'
            ], 403);
        }

        return response()->json([
            'message' => 'Invite token is valid.',
            'company_name' => $invite->company->name,
            'invite' => $invite
        ]);
    }
}
