<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Announcement extends Model
{
    protected $fillable = [
        'company_id',
        'date',
        'content'
    ];

     protected $casts = [
        'date' => 'date'
    ];

    public function profile()
    {
        return $this->belongsTo(CompanyUser::class, 'profile_id', 'id');
    }
}
