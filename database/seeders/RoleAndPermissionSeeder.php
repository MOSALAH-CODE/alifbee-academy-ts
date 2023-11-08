<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleAndPermissionSeeder extends Seeder
{
public function run()
{
    Permission::create(['name' => 'create-users']);
    Permission::create(['name' => 'edit-users']);
    Permission::create(['name' => 'delete-users']);

    Permission::create(['name' => 'create-lesson']);
    Permission::create(['name' => 'edit-lesson']);
    Permission::create(['name' => 'delete-lesson']);

    Permission::create(['name' => 'book-lesson']);
    Permission::create(['name' => 'buy-credits']);

    $adminRole = Role::create(['name' => 'Admin']);
    $tutorRole = Role::create(['name' => 'Tutor']);
    $learnerRole = Role::create(['name' => 'Learner']);

    $adminRole->givePermissionTo([
        'create-users',
        'edit-users',
        'delete-users',
        'create-lesson',
        'edit-lesson',
        'delete-lesson',
        'book-lesson',
        'buy-credits',
    ]);

    $tutorRole->givePermissionTo([
        'create-lesson',
        'edit-lesson',
        'delete-lesson',
    ]);
    $learnerRole->givePermissionTo([
        'book-lesson',
        'buy-credits',
    ]);

}
}
