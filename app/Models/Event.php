<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Event extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'description',
        'start_time',
        'end_time',
        'all_day',
        'completed',
        'cost',
        'event_day_id',
        'business_id',
        'telephone_1',
        'telephone_2'
        
    ];

    public function day():BelongsTo
    {
        return $this->belongsTo(EventDay::class, 'event_day_id');
    }

    public function payments():HasMany
    {
        return $this->hasMany(EventPayment::class, 'event_id');
    }
}
