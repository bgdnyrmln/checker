<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function profiles(Request $request){
        $user = $request->user();
        return response()->json([
            'user' => $user,
            'profiles' => $user ->profiles()->with('company')->get(),
        ]);
    }

    public function show($id)
    {
        return User::findOrFail($id);
    }

    public function update(Request $request)
    {
        $user = $request->user();

         $data = $request->validate([
            'first_name' => 'sometimes|string|max:50',
            'last_name' => 'sometimes|string|max:50',
            'email' => 'sometimes|email|unique:users,email,' . $user->id
        ]);
 
        $user->update($request->only([
            'first_name',
            'last_name',
            'email'
        ]));

        return response()->json([
            'message' => 'Profile updated successfully',
            'user' => $user
        ]);
    }


}
