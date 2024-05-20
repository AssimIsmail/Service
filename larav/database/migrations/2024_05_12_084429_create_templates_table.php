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
        Schema::create('templates', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('utilisateur_id');
            $table->unsignedBigInteger('service_id');
            $table->string('image')->nullable();
            $table->timestamps();
            $table->foreign('utilisateur_id')->references('id')->on('utilisateurs')->onDelete('cascade');
            $table->foreign('service_id')->references('id')->on('services')->onDelete('cascade');

        });
        $templates = [
            ['utilisateur_id' => 2,'service_id' => 1, 'image' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUz7q2mUDXDo12hkKqQyE8IzQ-CIT7riTStA&s'],
            ['utilisateur_id' => 2, 'service_id' => 1,'image' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB9-lYe25OFAVaS6HOSs0MdhmIdcdhuvOwhg&s'],
            ['utilisateur_id' => 2, 'service_id' => 1,'image' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHRTb0T2gKbMs5Na7_fI6gLd71_Uv0SnLYHA&s'],
        ];
        DB::table('templates')->insert($templates);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('templates');
    }
};
