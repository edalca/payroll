<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    // Nombre de la tabla (opcional si coincides con la convención de Laravel)
    protected $table = 'employees';

    // Campos que se pueden llenar masivamente
    protected $fillable = [
        'type_document',
        'code',
        'id_number',
        'nit',
        'first_name',
        'last_name',
        'birth_date',
        'address',
        'phone_number',
        'email',
        'sex',
        'nationality_id',
        'country_id',
        'marital_status_id',
    ];

    // Conversión automática de tipos
    protected $casts = [
        'birth_date' => 'date', // Convierte la fecha de nacimiento a un objeto Carbon
        'type_document' => 'string', // Asegura que el enum se trate como string
        'sex' => 'string', // Asegura que el enum se trate como string
    ];

    // Relación con la tabla 'countries' para nacionalidad
    public function nationality()
    {
        return $this->belongsTo(Country::class, 'nationality_id');
    }

    // Relación con la tabla 'countries' para país/departamento
    public function country()
    {
        return $this->belongsTo(Country::class, 'country_id');
    }

    // Relación con la tabla 'marital_statuses' para estado civil
    public function maritalStatus()
    {
        return $this->belongsTo(MaritalStatus::class, 'marital_status_id');
    }

    public function Attributes()
    {
        return $this->belongsToMany(Attributes::class, 'employee_attributes')
                    ->withPivot('value');
    }
}
