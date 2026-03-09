<?php
// app/Models/Holiday.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Holiday extends Model
{
    protected $fillable = [
        'content',
        'date_start',
        'date_end',
        'profile_id',
        'is_approved',
    ];

    protected $casts = [
        'date_start'  => 'date',
        'date_end'    => 'date',
        'is_approved' => 'boolean',
    ];

    public function profile()
    {
        return $this->belongsTo(CompanyUser::class);
    }
}
