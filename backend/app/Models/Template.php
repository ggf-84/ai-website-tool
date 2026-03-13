<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Template extends Model
{
    protected $fillable = [
        'name',
        'site_type',
        'description',
        'usage_count',
        'color',
    ];

    public function sites(): HasMany
    {
        return $this->hasMany(Site::class);
    }
}
