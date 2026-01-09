<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Invite;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class InviteController extends Controller
{
    public function create(Request $request)
    {
        $user = $request->user();

        // only company owner
        if ($user->role !== 'admin') {
            abort(403);
        }

        $invite = Invite::create([
            'company_id' => $user->company_id,
            'token' => Str::uuid(),
            'expires_at' => now()->addDays(7),
        ]);

        return response()->json([
            'link' => config('app.frontend_url') . 'auth/register?token=' . $invite->token
        ]);
    }

    public function validateToken($token)
    {
        $invite = Invite::where('token', $token)
                        ->whereNull('used_at') // ensure it's not already used
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
