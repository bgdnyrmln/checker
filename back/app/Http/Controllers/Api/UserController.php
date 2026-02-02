<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CompanyUser;

class UserController extends Controller
{
    public function profiles(Request $request){
        $user = $request->user();
        return response()->json($user->companies()->get());
    }
}
