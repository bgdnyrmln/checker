<?php
// app/Models/SickLeave.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SickLeave extends Model
{
    protected $fillable = [
        'file',
        'date_start',
        'date_end',
        'profile_id',
    ];

    protected $hidden = ['file']; // prevents binary data from being JSON encoded

    protected $casts = [
        'date_start' => 'date',
        'date_end'   => 'date',
    ];

    public function profile()
    {
        return $this->belongsTo(CompanyUser::class);
    }

    // helper to check if file exists without exposing binary
    protected $appends = ['has_file'];

    public function getHasFileAttribute(): bool
    {
        // Check via a lightweight query instead of relying on loaded column
        return SickLeave::where('id', $this->id)
            ->whereNotNull('file')
            ->exists();
    }
}
