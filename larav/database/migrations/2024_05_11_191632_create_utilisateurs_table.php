<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Utilisateur; // Corrected the capitalization of the model name

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('utilisateurs', function (Blueprint $table) {
            $table->id();
            $table->string('username');
            $table->string('lastname');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('role')->default('user');
            $table->string('image')->nullable();
            $table->string('token')->nullable();
            $table->timestamps();
        });

        // Creating sample users
        Utilisateur::create([
            'username' => 'David',
            'lastname' => 'Alonso',
            'email' => 'user1@example.com',
            'password' => Hash::make('password'), // Utilisation de Hash pour le mot de passe
            'role' => 'user',
            'image' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA8XuTiuSpptpxQxnZ-PWBFqEh1NSljD09itOMlC27Jsuk5USl-wPjABNiHjgAe1Kwnss&usqp=CAU',
        ]);

        Utilisateur::create([
            'username' => 'Roger',
            'lastname' => 'Taylor',
            'email' => 'dev1@example.com',
            'password' => Hash::make('password'), // Utilisation de Hash pour le mot de passe
            'role' => 'dev',
            'image' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDJzEaxLN-jGRYYUO65pWu7Q9GXoNt4LUSSA&s',
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('utilisateurs');
    }
};
