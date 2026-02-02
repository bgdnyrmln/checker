<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('shifts', function (Blueprint $table) {
            $table->id();

            $table->foreignId('profile_id')
                ->constrained('company_user')
                ->cascadeOnDelete();

            $table->date('shift_date');
            $table->time('starts_at');
            $table->time('ends_at');

            $table->timestamps();

            $table->unique([
                'profile_id',
                'shift_date'
            ]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shifts');
    }
};
