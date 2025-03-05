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
        Schema::create('contracts', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique(); // Código único del contrato
            $table->foreignId('employee_id')->constrained('employees')->onDelete('cascade'); // Relación con empleado
            $table->foreignId('contract_type_id')->constrained('contract_types'); // Tipo de contrato
            $table->foreignId('job_title_id')->constrained('job_titles'); // Cargo o título del puesto
            $table->foreignId('work_shift_id')->constrained('work_shifts'); // Turno laboral
            $table->date('start_date'); // Fecha de inicio del contrato
            $table->date('end_date')->nullable(); // Fecha de fin (si es temporal)
            $table->decimal('salary', 10, 2); // Salario
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contracts');
    }
};
