<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AiContent extends Model
{
    protected $table = 'ai_contents';

    protected $fillable = [
        'site_id',
        'type',
        'related',
        'prompt',
        'persona',
        'status',
    ];

    public function site(): BelongsTo
    {
        return $this->belongsTo(Site::class);
    }
}
