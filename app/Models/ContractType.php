<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ContractType extends Model
{
    // Nombre de la tabla (opcional si coincide con el nombre del modelo en plural)
    protected $table = 'contract_types';

    // Campos que se pueden llenar masivamente
    protected $fillable = [
        'name',
        'description',
        'code',
    ];

    // Campos que se convierten a fechas automáticamente
    protected $dates = [
        'created_at',
        'updated_at',
    ];

    // Si quisieras agregar soft deletes (opcional, no está en tu migración, pero es buena práctica)
    // use SoftDeletes;
    // protected $dates = ['deleted_at'];
}
