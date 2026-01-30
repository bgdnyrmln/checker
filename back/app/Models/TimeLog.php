<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TimeLog extends Model
{
    protected $fillable = [
        'profile_id',
        'checked_in_at',
        'checked_out_at',
    ];

    protected $casts = [
        'checked_in_at' => 'datetime',
        'checked_out_at' => 'datetime',
    ];


    public function profile()
    {
        return $this->belongsTo(CompanyUser::class, 'profile_id', 'id');
    }


    public function user()
    {
        return $this->profile->user();
    }
}
