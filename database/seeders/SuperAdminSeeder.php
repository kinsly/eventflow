<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class SuperAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::create(['name' => 'Super Admin']);
        Role::create(['name' => 'Admin']);
        Role::create(['name' => 'Free User']);
        Role::create(['name' => 'Pending']);
        // Creating Super Admin User
        $superAdmin = User::create([
            'id' =>'1',
            'name' => 'Super ad kinsly', 
            'email' => 'kinsly@gmail.com',
            'password' => Hash::make('920720455')
        ]);
        $superAdmin->assignRole('Super Admin');
    }
}
