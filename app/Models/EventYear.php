<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class EventYear extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'year',
        'user_id'
    ];


    public function months():HasMany
    {
        return $this->hasMany(EventMonth::class);
    }
}
