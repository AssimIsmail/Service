<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB; // Importez la facade DB pour utiliser DB::table

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('utilisateur_id');
            $table->unsignedBigInteger('categorie_id');
            $table->string('image')->nullable();
            $table->string('categorie');
            $table->string('description', 1000);
            $table->decimal('prixmoyen', 8, 2); 
            $table->timestamps();
            $table->foreign('utilisateur_id')->references('id')->on('utilisateurs')->onDelete('cascade');
            $table->foreign('categorie_id')->references('id')->on('categories')->onDelete('cascade');
        });

        DB::table('services')->insert([
            [
                'utilisateur_id' => 2,
                'categorie_id' => 1,
                'categorie' => 'frontend development',
                'image' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR97RVMnzcyw10QShqKx_onl2RmG4nbKiz86Q&s',
                'description' => 'Je suis un développeur frontend expérimenté spécialisé dans la création de sites web interactifs et conviviaux. Avec une expertise approfondie en HTML, CSS et JavaScript, je suis capable de transformer vos idées en interfaces utilisateur dynamiques et attrayantes. Que vous ayez besoin de concevoir une nouvelle application web ou de moderniser une interface existante, je suis là pour vous aider. Mon approche axée sur la qualité et l\'attention aux détails garantit que chaque projet est livré avec une expérience utilisateur exceptionnelle. Contactez-moi dès aujourd\'hui pour discuter de vos besoins en développement frontend et commencer à donner vie à votre vision en ligne.',
                'prixmoyen' => 50.00,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }

    
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
