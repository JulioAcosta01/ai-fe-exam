<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\Company;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        User::factory()->create([ 
            'email' => 'admin@example.com',
            'type' => 'Admin',
            'password' => bcrypt('password'),
        ]);

        Article::factory()->count(5)->create();
    }
}
