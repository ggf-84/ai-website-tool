<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('site_id')->constrained()->cascadeOnDelete();
            $table->string('reviewer');
            $table->unsignedTinyInteger('overall_rating');
            $table->unsignedTinyInteger('effectiveness');
            $table->unsignedTinyInteger('ease_of_use');
            $table->unsignedTinyInteger('satisfaction');
            $table->string('user_type')->nullable(); // Patient etc.
            $table->string('gender')->nullable();
            $table->unsignedTinyInteger('age')->nullable();
            $table->string('duration')->nullable(); // "3 months"
            $table->string('condition')->nullable();
            $table->enum('source', ['User Submitted', 'AI-generated', 'Imported'])->default('User Submitted');
            $table->enum('status', ['Pending', 'Approved', 'Rejected', 'Flagged'])->default('Pending');
            $table->unsignedInteger('reports')->default(0);
            $table->text('review_text')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
