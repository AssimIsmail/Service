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
        Schema::create('experiences', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('utilisateur_id');
            $table->string('description');
            $table->timestamps();
            $table->foreign('utilisateur_id')->references('id')->on('utilisateurs')->onDelete('cascade');
        });

        $experiences = [
            ['utilisateur_id' => 2, 'description' => 'Développeur web chez ABC Company - Géré le développement et la maintenance des sites Web utilisant les dernières technologies.'],
            ['utilisateur_id' => 2, 'description' => 'Stage en développement logiciel chez XYZ Corporation - Contribué à la conception et à la mise en œuvre de nouvelles fonctionnalités pour une application Web grand public.'],
        ];
        

        DB::table('experiences')->insert($experiences);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('experiences');
    }
};
