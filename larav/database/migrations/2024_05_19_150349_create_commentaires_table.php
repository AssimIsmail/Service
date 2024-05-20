<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Commentaire;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('commentaires', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('utilisateur_id');
            $table->unsignedBigInteger('service_id');
            $table->string('commentaire');
            $table->unsignedInteger('etoil')->default(0);
            $table->timestamps();
            $table->foreign('utilisateur_id')->references('id')->on('utilisateurs')->onDelete('cascade');
            $table->foreign('service_id')->references('id')->on('services')->onDelete('cascade');
        });
        DB::table('commentaires')->insert
        ([
                [
                    'utilisateur_id' => 1,
                    'service_id' => 1,
                    'commentaire' => 'Ceci est un commentaire de test pour le service 1.',
                    'etoil' => 4,
                ],
                [
                    'utilisateur_id' => 2,
                    'service_id' => 1,
                    'commentaire' => 'Ceci est un autre commentaire de test pour le service 1.',
                    'etoil' => 5,
                ],
                [
                    'utilisateur_id' => 2,
                    'service_id' => 1,
                    'commentaire' => 'Ceci est un autre commentaire de test pour le service 1.',
                    'etoil' => 5,
                ],
                [
                    'utilisateur_id' => 2,
                    'service_id' => 1,
                    'commentaire' => 'Ceci est un autre commentaire de test pour le service 1.',
                    'etoil' => 5,
                ],
                [
                    'utilisateur_id' => 2,
                    'service_id' => 1,
                    'commentaire' => 'Ceci est un autre commentaire de test pour le service 1.',
                    'etoil' => 5,
                ]
            ]);

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('commentaires');
    }
};
