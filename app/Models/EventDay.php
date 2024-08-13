<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class EventDay extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'date', 'event_month_id'
    ];

    public function events():HasMany
    {
        return $this->hasMany(Event::class,'event_day_id');
    }

    public function month():BelongsTo
    {
        return $this->belongsTo(EventMonth::class, 'event_month_id');
    }
}
