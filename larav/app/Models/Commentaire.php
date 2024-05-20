<?php

namespace App\Models;
use App\Models\Utilisateur;
use App\Models\Service;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Commentaire extends Model
{
    use HasFactory;
    protected $table = 'commentaires';
    protected $fillable = [
        'utilisateur_id',
        'service_id',
        'commentaire',
        'etoil',
    ];

    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class, 'utilisateur_id');
    }

    public function service()
    {
        return $this->belongsTo(Service::class, 'service_id');
    }
}
