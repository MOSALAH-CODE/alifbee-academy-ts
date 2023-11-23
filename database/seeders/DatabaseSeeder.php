<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Lessons;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleAndPermissionSeeder::class,
        ]);

        $admin = User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('adminpass'),
            'balance' => 100,
        ]);
        $admin->assignRole("Admin");


        User::factory(5)->create()->each(function ($user) {
            $user->assignRole("Tutor");
        });

        User::factory(10)->create()->each(function ($user) {
            $user->assignRole("Learner");
        });
        
        Lessons::factory(50)->create();
    }
}
