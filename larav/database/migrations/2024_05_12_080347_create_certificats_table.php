<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('certificats', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('utilisateur_id');
            $table->string('description');
            $table->timestamps();
            $table->foreign('utilisateur_id')->references('id')->on('utilisateurs')->onDelete('cascade');
        });

        $certificats = [
            ['utilisateur_id' => 2, 'description' => 'Certificat de développement Web avancé'],
            ['utilisateur_id' => 2, 'description' => 'Certificat de maîtrise de PHP'],
            ['utilisateur_id' => 2, 'description' => 'Certificat de conception de base de données'],
        ];

        DB::table('certificats')->insert($certificats);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('certificats');
    }
};
