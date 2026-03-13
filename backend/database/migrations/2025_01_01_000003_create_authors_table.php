<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('authors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('site_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('specialty')->nullable();
            $table->string('tone')->nullable();
            $table->enum('status', ['Active', 'Draft'])->default('Active');
            $table->unsignedInteger('articles_count')->default(0);
            $table->string('avatar')->nullable(); // inițiale sau url
            $table->text('bio')->nullable();
            $table->json('style')->nullable(); // array de string-uri
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('authors');
    }
};
