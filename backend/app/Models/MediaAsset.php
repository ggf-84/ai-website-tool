<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MediaAsset extends Model
{
    protected $fillable = [
        'site_id',
        'name',
        'tag',
        'width',
        'height',
        'path',
    ];

    public function site(): BelongsTo
    {
        return $this->belongsTo(Site::class);
    }
}
