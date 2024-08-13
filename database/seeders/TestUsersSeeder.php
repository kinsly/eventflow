<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class TestUsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         // Creating Super Admin User
         $user1 = User::create([
            'name' => 'user1', 
            'email' => 'user1@gmail.com',
            'password' => Hash::make('920720455'),
            'email_verified_at' => '2024-06-02 08:02:26'
        ]);
        $user1->assignRole('Free User');

        $user2 = User::create([
          'name' => 'user2', 
          'email' => 'user2@gmail.com',
          'password' => Hash::make('920720455'),
          'email_verified_at' => '2024-06-02 08:02:26'
        ]);
        $user2->assignRole('Free User');
    }
}
