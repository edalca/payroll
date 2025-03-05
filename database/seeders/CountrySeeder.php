<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Country;

class CountrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $countries = [
            // América del Norte
            ['name' => 'Canadá', 'code' => 'CA'],
            ['name' => 'Estados Unidos', 'code' => 'US'],
            ['name' => 'México', 'code' => 'MX'],

            // América Central
            ['name' => 'Belice', 'code' => 'BZ'],
            ['name' => 'Costa Rica', 'code' => 'CR'],
            ['name' => 'El Salvador', 'code' => 'SV'],
            ['name' => 'Guatemala', 'code' => 'GT'],
            ['name' => 'Honduras', 'code' => 'HN'],
            ['name' => 'Nicaragua', 'code' => 'NI'],
            ['name' => 'Panamá', 'code' => 'PA'],

            // América del Sur
            ['name' => 'Argentina', 'code' => 'AR'],
            ['name' => 'Bolivia', 'code' => 'BO'],
            ['name' => 'Brasil', 'code' => 'BR'],
            ['name' => 'Chile', 'code' => 'CL'],
            ['name' => 'Colombia', 'code' => 'CO'],
            ['name' => 'Ecuador', 'code' => 'EC'],
            ['name' => 'Guyana', 'code' => 'GY'],
            ['name' => 'Paraguay', 'code' => 'PY'],
            ['name' => 'Perú', 'code' => 'PE'],
            ['name' => 'Surinam', 'code' => 'SR'],
            ['name' => 'Uruguay', 'code' => 'UY'],
            ['name' => 'Venezuela', 'code' => 'VE'],

            // Caribe
            ['name' => 'Antigua y Barbuda', 'code' => 'AG'],
            ['name' => 'Bahamas', 'code' => 'BS'],
            ['name' => 'Barbados', 'code' => 'BB'],
            ['name' => 'Cuba', 'code' => 'CU'],
            ['name' => 'Dominica', 'code' => 'DM'],
            ['name' => 'Granada', 'code' => 'GD'],
            ['name' => 'Haití', 'code' => 'HT'],
            ['name' => 'Jamaica', 'code' => 'JM'],
            ['name' => 'República Dominicana', 'code' => 'DO'],
            ['name' => 'San Cristóbal y Nieves', 'code' => 'KN'],
            ['name' => 'Santa Lucía', 'code' => 'LC'],
            ['name' => 'San Vicente y las Granadinas', 'code' => 'VC'],
            ['name' => 'Trinidad y Tobago', 'code' => 'TT'],
        ];

        // Insertar los países en la base de datos
        foreach ($countries as $country) {
            Country::create($country);
        }
    }
}
