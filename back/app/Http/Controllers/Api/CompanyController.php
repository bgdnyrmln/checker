<?php

namespace App\Http\Controllers\Api;

use App\Models\Company;
use App\Models\User;
use App\Models\CompanyUser;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;

class CompanyController extends Controller
{
    public function register(Request $request)
    {
        $data = $request->validate([
            'company_name' => 'required|string|max:100',
            'company_email' => 'required|email|unique:companies,email',
            'first_name' => 'required|string|max:30',
            'last_name' => 'required|string|max:30',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|confirmed|min:6',
        ]);

        //Create company
        $company = Company::create([
            'name' => $data['company_name'],
            'email' => $data['company_email'],
        ]);

        //Create user
        $user = User::create([
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        //Attach user to company via pivot
        $companyUser = CompanyUser::create([
            'user_id' => $user->id,
            'company_id' => $company->id,
            'role' => 'manager'
        ]);


        return response()->json([
            'company' => $company,
            'user' => $user,
        ], 201);
    }

    
}
