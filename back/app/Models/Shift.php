<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Shift extends Model
{
    protected $fillable = [
        'profile_id', // this is company_user.id
        'shift_date',
        'starts_at',
        'ends_at',
    ];

    protected $casts = [
        'shift_date' => 'date',
        'starts_at' => 'datetime:H:i',
        'ends_at' => 'datetime:H:i',
    ];

    public function companyUser()
    {
        // profile_id references company_user.id
        return $this->belongsTo(CompanyUser::class, 'profile_id', 'id');
    }

    public function user()
    {
        return $this->companyUser->user;
    }

    public function company()
    {
        return $this->companyUser->company;
    }
}
