<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class VerifySuperAdmin extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
      $superAdmin = User::find(1);
      $superAdmin->email_verified_at = '2024-06-02 08:02:26';
      $superAdmin->save();
    }
}
