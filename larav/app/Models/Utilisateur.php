<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Commentaire;

class Utilisateur extends Model implements \Illuminate\Contracts\Auth\Authenticatable
{
    use HasFactory, Authenticatable, HasApiTokens;

    protected $fillable = [
        'username',
        'lastname',
        'email',
        'password',
        'role',
        'image',
        'token'
    ];
public function getImageAttribute($value)
{
    return $value ? url('storage/' . $value) : null;
}

    public function services()
    {
        return $this->hasMany(Service::class);
    }

    public function certificats()
    {
        return $this->hasMany(Certificat::class);
    }

    public function experiences()
    {
        return $this->hasMany(Experience::class);
    }

    public function templates()
    {
        return $this->hasMany(Template::class);
    }
    public function commentaires()
    {
        return $this->hasMany(Commentaire::class);
    }
}