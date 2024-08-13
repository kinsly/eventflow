<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Business extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = [
        'name',
        'role',
    ];

    /**Many to many. Use attach. 
     * return users belong to selected business.
     */
    public function users():BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }

    /**
     * Send the owner of the business. Not need now.
     */
    public function owner(){
        
    }
}
