<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Site extends Model
{
    protected $fillable = [
        'name',
        'domain',
        'type',
        'template_id',
        'status',
        'pages_count',
        'posts_count',
        'reviews_count',
        'primary_product',
        'language',
    ];

    public function template(): BelongsTo
    {
        return $this->belongsTo(Template::class);
    }

    public function pages(): HasMany
    {
        return $this->hasMany(Page::class);
    }

    public function articles(): HasMany
    {
        return $this->hasMany(Article::class);
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }

    public function authors(): HasMany
    {
        return $this->hasMany(Author::class);
    }
}
