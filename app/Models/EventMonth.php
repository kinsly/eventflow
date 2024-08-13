<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class EventMonth extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'month', 'event_year_id'
    ];

    public function year():BelongsTo
    {
        return $this->belongsTo(EventYear::class, "event_year_id");
    }

    public function days():HasMany
    {
        return $this->hasMany(EventDay::class);
    }
}
