<?php
namespace App\Models;
use App\Models\Commentaire;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;
    protected $table = 'services';
    protected $fillable = [
        'image',
        'description',
        'categorie',
        'prixmoyen',
        'utilisateur_id',
        'categorie_id',
    ];

    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class);
    }

    public function categorie()
    {
        return $this->belongsTo(Categorie::class);
    }
    public function basics()
    {
        return $this->hasMany(Basic::class);
    }
    public function standards()
    {
        return $this->hasMany(Standard::class);
    }
    public function premiums()
    {
        return $this->hasMany(Premium::class);
    }
    public function commentaires()
    {
        return $this->hasMany(Commentaire::class);
    }
}
