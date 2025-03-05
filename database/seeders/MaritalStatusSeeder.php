<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MaritalStatus;

class MaritalStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Define los datos que deseas insertar
        $maritalStatuses = [
            ['name' => 'Soltero'],
            ['name' => 'Casado'],
            ['name' => 'Divorciado'],
            ['name' => 'Viudo'],
            ['name' => 'Separado'],
        ];

        // Inserta los datos en la tabla 'marital_statuses'
        foreach ($maritalStatuses as $status) {
            MaritalStatus::create($status);
        }
    }
}
