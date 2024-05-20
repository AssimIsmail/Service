<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    use HasFactory;
    protected $table = 'experiences';
    protected $fillable = [
        'utilisateur_id', // Added the field to the fillable array
        'description', // Added the field to the fillable array
    ];

    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class); // Assuming Utilisateur is the model for the 'utilisateurs' table
    }
}
