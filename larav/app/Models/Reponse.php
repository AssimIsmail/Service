<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reponse extends Model
{
    use HasFactory;
    protected $fillable = [
        'support_id',
        'utilisateur_id',
        'description',
    ] ;
    public function support()
    {
        return $this->belongsTo(Support::class, 'support_id');
    }
}
