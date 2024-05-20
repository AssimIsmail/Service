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
        Schema::create('demandes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('utilisateur_id');
            $table->string('dev');
            $table->string('demandeur');
            $table->string('name_dev');
            $table->string('prix');
            $table->string('type');
            $table->string('durer');
            $table->string('revisions');
            $table->string('description');
            $table->string('mes_besoin');
            $table->string('status')->default('en attente');
            $table->timestamps();
            $table->foreign('utilisateur_id')->references('id')->on('utilisateurs')->onDelete('cascade');
        });
        DB::table('demandes')->insert([
            'utilisateur_id' => 1,
            'dev' => 2,
            'demandeur' => 'Nom',
            'name_dev' => 'Nom du dév',
            'prix' => '100',
            'type' => 'Basics',
            'durer' => '4',
            'revisions' => '3',
            'description' => 'Description de la demande',
            'mes_besoin' => 'Besoins spécifiques',
            'status' => 'Terminer',
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('demandes');
    }
};
