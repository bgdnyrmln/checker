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
        if ($user->role !== 'director') {
            abort(403);
        }

        $invite = Invite::create([
            'company_id' => $user->company_id,
            'token' => Str::uuid(),
            'expires_at' => now()->addDays(7),
        ]);

        return response()->json([
            'link' => config('app.frontend_url') . '/register/employee?token=' . $invite->token
        ]);
    }
}
