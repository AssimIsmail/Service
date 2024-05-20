<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Template extends Model
{
    use HasFactory;
    protected $table = 'templates';
    protected $fillable = [
        'service_id',
        'utilisateur_id',
        'image',
    ] ;
    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class);
    }
}
