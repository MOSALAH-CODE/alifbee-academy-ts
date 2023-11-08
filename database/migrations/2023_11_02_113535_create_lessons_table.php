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
        Schema::create('lessons', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')
                ->references('id')->on('users')->onDelete('cascade');
            $table->unsignedBigInteger('tutor_id');
            $table->foreign('tutor_id')
                ->references('id')->on('users')->onDelete('cascade');
            $table->timestamp('start_date');
            $table->timestamp('end_date');
            $table->string('status', 50);
            $table->string('meet_id')->nullable();
            $table->string('password')->nullable();
            $table->unsignedSmallInteger('credit_cost');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lessons');
    }
};
