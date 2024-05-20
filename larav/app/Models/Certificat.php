<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Certificat extends Model
{
    use HasFactory;
    protected $table = 'experiences';
    protected $fillable = [
        'utilisateur_id', 
        'description', 
    ];

    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class); 
    }
}
