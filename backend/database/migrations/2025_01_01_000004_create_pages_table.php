<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('pages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('site_id')->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->enum('type', ['Header', 'Footer'])->default('Header');
            $table->string('slug')->unique();
            $table->enum('seo_status', ['Complete', 'Needs Review', 'Missing Keywords', 'Missing Meta', 'N/A'])->default('N/A');
            $table->enum('content_status', ['Published', 'Draft'])->default('Draft');
            $table->enum('menu', ['Header', 'Footer', 'Hidden'])->default('Header');
            $table->unsignedInteger('word_count')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pages');
    }
};
