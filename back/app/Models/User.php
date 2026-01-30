<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Models\CompanyUser;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
    ];

    protected $hidden = ['password', 'remember_token'];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function companies()
    {
        return $this->belongsToMany(
            Company::class,
            'company_user' // pivot table
        )->withPivot('role');
    }

    // All company profiles
    public function profiles()
    {
        return $this->hasMany(CompanyUser::class);
    }

    // All time logs across all profiles
    public function timeLogs()
    {
        return $this->hasManyThrough(
            TimeLog::class,
            CompanyUser::class,
            'user_id',     // Foreign key on pivot table (company_user)
            'profile_id',  // Foreign key on time_logs
            'id',          // Local key on users
            'id'           // Local key on company_user
        );
    }

    public function role($companyId)
    {
        $companyUser = CompanyUser::where('user_id', $this->id)
                                  ->where('company_id', $companyId)
                                  ->first();

        return $companyUser ? $companyUser->role : null;
    }
}
