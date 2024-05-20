<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Demande extends Model
{
    use HasFactory;
    protected $table = 'demandes'; // Nom de la table
    protected $fillable = [
        'name_dev',
        'prix',
        'type',
        'durer',
        'revisions',
        'description',
        'mes_besoin',
        'en attente',
        'utilisateur_id',
        'dev',
        'demandeur',
        'status'
    ]; 
}

