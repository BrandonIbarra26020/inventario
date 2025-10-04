<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        //crea la tabla users
        Schema::create('users', function (Blueprint $table) {
            $table->id();//clave primaria auto incremental
            $table->string('nombre');//columna nombre
            $table->string('email')->unique();//columna email unica
            $table->string('password');//columna password
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');//elimina la tabla users si existe
    }
};
