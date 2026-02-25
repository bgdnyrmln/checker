<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Invite;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class EmployeeRegisterController extends Controller
{
    public function register(Request $request)
    {
        // Validate request
        $request->validate([
            'token' => 'required|string',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|confirmed|min:8',
        ]);

        // Find valid invite
        $invite = Invite::where('token', $request->token)
            ->whereNull('used_at')
            ->where(function ($q) {
                $q->whereNull('expires_at')
                  ->orWhere('expires_at', '>', now());
            })
            ->firstOrFail();

        // Create the user
        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Attach user to company with role from invite
        $user->companies()->attach($invite->company_id, [
            'role' => 'employee' // or you can add role field to invite if needed
        ]);

        // Mark invite as used
        $invite->update(['used_at' => now()]);

        return response()->json([
            'message' => 'User registered and added to company successfully.'
        ]);
    }


    public function connect(Request $request)
    {
        // Validate token
        $request->validate([
            'token' => 'required|string',
            'user_id' => 'required|integer|exists:users,id',
        ]);

        // Find valid invite
        $invite = Invite::where('token', $request->token)
            ->whereNull('used_at')
            ->where(function ($q) {
                $q->whereNull('expires_at')
                  ->orWhere('expires_at', '>', now());
            })
            ->firstOrFail();

        $user = User::where('id', $request->user_id)->firstOrFail();

        // Attach user to company with role from invite
        $user->companies()->attach($invite->company_id, [
            'role' => 'employee' // or you can add role field to invite if needed
        ]);

        $invite->update(['used_at' => now()]);

        return response()->json([
            'user' => $user,
            'company_id' => $invite->company_id,
        ]);
    }
}
