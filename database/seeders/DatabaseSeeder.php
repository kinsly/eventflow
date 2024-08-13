<?php

namespace Database\Seeders;

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
        if (config('app.env') === 'local') {
            $this->call([
                SuperAdminSeeder::class,
                TestUsersSeeder::class,
                // TestEventsSeeder::class
            ]);
        }else{
            $this->call([
                SuperAdminSeeder::class,
            ]);
        }

        
        
        
    }
}
