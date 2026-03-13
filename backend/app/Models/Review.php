<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Review extends Model
{
    protected $fillable = [
        'site_id',
        'reviewer',
        'overall_rating',
        'effectiveness',
        'ease_of_use',
        'satisfaction',
        'user_type',
        'gender',
        'age',
        'duration',
        'condition',
        'source',
        'status',
        'reports',
        'review_text',
    ];

    public function site(): BelongsTo
    {
        return $this->belongsTo(Site::class);
    }
}
