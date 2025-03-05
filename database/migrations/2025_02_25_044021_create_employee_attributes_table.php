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
        Schema::create('employee_attributes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained("employees")->onDelete('cascade');
            $table->foreignId('attribute_id')->constrained("attributes")->onDelete('cascade');
            $table->string('value'); // Valor (texto o JSON para "multiple")
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employee_attributes');
    }
};
