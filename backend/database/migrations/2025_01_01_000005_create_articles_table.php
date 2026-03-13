<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('site_id')->constrained()->cascadeOnDelete();
            $table->foreignId('author_id')->nullable()->constrained()->nullOnDelete();
            $table->string('title');
            $table->string('topic')->nullable();
            $table->enum('status', ['Published', 'Draft', 'Scheduled', 'Archived'])->default('Draft');
            $table->date('publish_date')->nullable();
            $table->enum('source', ['Manual', 'AI-generated', 'Imported'])->default('Manual');
            $table->enum('seo_status', ['Complete', 'Missing Meta', 'Needs Review', 'Missing Keywords'])->default('Missing Meta');
            $table->unsignedInteger('word_count')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
