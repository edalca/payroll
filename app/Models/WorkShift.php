<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WorkShift extends Model
{
    protected $table = 'work_shifts';

    protected $fillable = [
        'code',
        'name',
        'start_time',
        'end_time',
    ];

    protected $dates = [
        'created_at',
        'updated_at',
        'start_time',
        'end_time',
    ];
}
