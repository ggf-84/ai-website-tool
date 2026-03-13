<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('ai_contents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('site_id')->constrained()->cascadeOnDelete();
            $table->enum('type', ['Blog Article', 'Static Page', 'Review', 'Comment', 'SEO Metadata']);
            $table->string('related')->nullable();
            $table->text('prompt');
            $table->string('persona')->nullable();
            $table->enum('status', ['Draft', 'Ready for Review', 'Approved', 'Published', 'Rejected'])->default('Draft');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ai_contents');
    }
};
