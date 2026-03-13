<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('templates', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->enum('site_type', ['Product Site', 'Review Site']);
            $table->text('description')->nullable();
            $table->unsignedInteger('usage_count')->default(0);
            $table->string('color')->nullable(); // ex: "from-emerald-500 to-teal-600"
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('templates');
    }
};
