<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Invite;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class InviteController extends Controller
{

    public function index(Request $request)
    {
        $user = $request->user();

        $companyProfile = $user->profiles()
            ->where('role', 'manager')
            ->first();

        if (!$companyProfile) {
            abort(403, 'You are not manager of any company.');
        }

        return Invite::where('company_id', $companyProfile->company_id)
            ->whereNull('used_at')
            ->where('expires_at', '>', now())
            ->latest()
            ->get();
    }


    public function create(Request $request)
    {
        $user = $request->user();
        $companyProfile = $user->profiles()->where('role', 'manager')->first();

        if (!$companyProfile) {
            abort(403, 'You are not manager of any company.');
        }
        $invite = Invite::create([
            'company_id' => $companyProfile->company_id,
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

        return response()->json([
            'message' => 'Invite token is valid.',
            'invite' => $invite
        ]);
    }
}
