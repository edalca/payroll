<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->string("type_document"); // Tipo de documento
            $table->string("code")->unique(); // Código de empleado
            $table->string('id_number')->unique();
            $table->string('nit')->unique(); // NIT
            $table->string('first_name'); // Nombres
            $table->string('last_name'); // Apellidos
            $table->date('birth_date'); // Fecha de nacimiento
            $table->string('address'); // Dirección
            $table->string('phone_number')->nullable(); // Número de teléfono
            $table->string('email')->unique()->nullable(); // Correo electrónico
            $table->string("sex"); // Sexo
            $table->foreignId("nationality_id")->constrained("countries"); // Nacionalidad
            $table->foreignId("country_id")->constrained("countries"); // Departamento
            $table->foreignId("marital_status_id")->constrained("marital_statuses"); // Estado civil
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
