<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class EventPayment extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'event_id','deposit','date'
    ];

    public function payments():BelongsTo
    {
        return $this->BelongsTo(Event::class);
    }
}
