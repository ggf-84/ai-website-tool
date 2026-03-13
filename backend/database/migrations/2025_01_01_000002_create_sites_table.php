<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('sites', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('domain')->unique();
            $table->enum('type', ['Product Site', 'Review Site']);
            $table->foreignId('template_id')->nullable()->constrained()->nullOnDelete();
            $table->enum('status', ['Active', 'Draft', 'Archived'])->default('Draft');
            $table->unsignedInteger('pages_count')->default(0);
            $table->unsignedInteger('posts_count')->default(0);
            $table->unsignedInteger('reviews_count')->default(0);
            $table->string('primary_product')->nullable();
            $table->string('language', 5)->default('EN'); // ex: EN
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sites');
    }
};
