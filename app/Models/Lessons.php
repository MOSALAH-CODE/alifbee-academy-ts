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
        'created_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
        // 'password' => 'hashed',
    ];

    public function tutor() {
        return $this->hasOne(User::class, 'id', 'tutor_id');
    }

    /**
     * Scope a query to only include lessons of a specific status for a given user.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  string  $status
     * @param  int  $userId
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeFilteredLessonsByStatus($query, $status, $userId)
    {
        return $query->where('user_id', $userId)
                     ->where('status', $status);
    }
}
