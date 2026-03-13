<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Author extends Model
{
    protected $fillable = [
        'site_id',
        'name',
        'specialty',
        'tone',
        'status',
        'articles_count',
        'avatar',
        'bio',
        'style',
    ];

    protected $casts = [
        'style' => 'array',
    ];

    public function site(): BelongsTo
    {
        return $this->belongsTo(Site::class);
    }

    public function articles(): HasMany
    {
        return $this->hasMany(Article::class);
    }
}
