<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function role(Request $request, $companyId)
    {
        $user = $request->user();

        $role = $user->companies()
                     ->where('company_id', $companyId)
                     ->first()?->pivot->role;

        return response()->json(['role' => $role]);
    }

    public function profiles(Request $request){
        $user = $request->user();
        return response()->json($user->companies()->get());
    }
}
