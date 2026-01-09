<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('first_name', 30);
            $table->string('last_name', 30);
            $table->string('email')->unique();
            $table->string('password');
            $table->enum('role', ['admin', 'employee'])->default('employee');
            $table->foreignId('company_id')->constrained('companies')->cascadeOnDelete();
            $table->timestamps(); // adds created_at & updated_at
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
