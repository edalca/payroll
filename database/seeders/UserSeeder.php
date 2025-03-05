<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User; // Asegúrate de que el modelo User esté importado

class UserSeeder extends Seeder
{
    public function run()
    {
        User::create([
            'name' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('Admin2025'), // Encriptamos la contraseña
            'created_at' => now(), // Fecha actual
        ]);
    }
}