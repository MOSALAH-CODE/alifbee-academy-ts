<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Spatie\Permission\Models\Role;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('profile_picture')->nullable();
            $table->unsignedSmallInteger('balance')->default(0);
            $table->unsignedBigInteger('role_id')->default(0);
            $table->foreign('role_id')
                ->references('id')->on('roles')->onDelete('cascade');
            $table->string('account_verification_token')->nullable();
            $table->timestamp('account_verification_expiration')->nullable();
            $table->string('password_reset_token')->nullable();
            $table->timestamp('password_reset_expiration')->nullable();
            $table->string('remember_token')->nullable();
            $table->timestamp('remember_token_created_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
