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
        Schema::create('attributes', function (Blueprint $table) {
            $table->id();
            $table->string('key'); // Ejemplo: "Languages", "Certifications"
            $table->enum('type', ['value', 'selection', 'multiple']); // Tipo: valor, selección, varios
            $table->json('options')->nullable(); // Opciones en formato JSON
            $table->string("table_name"); // Nombre de la tabla relacionada
            $table->boolean('is_required')->default(false); // ¿Es obligatorio?
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attributes');
    }
};
