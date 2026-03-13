<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Page extends Model
{
    protected $fillable = [
        'site_id',
        'title',
        'type',
        'slug',
        'seo_status',
        'content_status',
        'menu',
        'word_count',
    ];

    public function site(): BelongsTo
    {
        return $this->belongsTo(Site::class);
    }
}
