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
        Schema::create('basics', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('service_id');
            $table->string('prix');
            $table->foreign('service_id')->references('id')->on('services')->onDelete('cascade');
            $table->string('description');
            $table->string('durer');
            $table->string('revisions');
            $table->timestamps();
        });
        DB::table('basics')->insert([
            'service_id' => 1,
            'prix' => '10',
            'description' => 'Description de test',
            'durer' => '3',
            'revisions' => '2',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('basics');
    }
};
