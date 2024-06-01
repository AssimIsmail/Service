<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    use HasFactory;
    protected $fillable = [
        'demande_id',
        'utilisateur_id',
        'message',
    ] ;
    public function demande()
    {
        return $this->belongsTo(Demande::class, 'demande_id');
    }
}
