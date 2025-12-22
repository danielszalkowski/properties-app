<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@ejemplo.com',
            'office_id' => 1,
        ])->assignRole('admin');

        User::factory()->create([
            'name' => 'God',
            'email' => 'god@ejemplo.com',
            'office_id' => 1,
        ])->assignRole('god');

        User::factory()->create([
            'name' => 'User',
            'email' => 'user@ejemplo.com',
            'office_id' => 2,
        ]);
    }
}