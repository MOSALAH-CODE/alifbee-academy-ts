<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lessons extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = [
//        'user_id',
//        'tutor_id',
//        'start_date',
//        'end_date',
//        'status',
//        'meet_id',
//        'password',
//        'credit_cost',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
        'password' => 'hashed',
    ];

    public function tutor() {
        return $this->hasOne(User::class, 'id', 'tutor_id');
    }
}
