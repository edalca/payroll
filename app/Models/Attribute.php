<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attribute extends Model
{
    // Nombre de la tabla
    protected $table = 'attributes';

    // Campos que se pueden llenar masivamente
    protected $fillable = [
        'key',
        'type',
        'options',
        'table_name',
        'is_required',
    ];

    // Conversión automática de tipos
    protected $casts = [
        'options' => 'array', // Convierte el JSON a un array automáticamente
        'is_required' => 'boolean', // Convierte el campo a booleano
        'type' => 'string', // Asegura que el enum se trate como string
    ];


}