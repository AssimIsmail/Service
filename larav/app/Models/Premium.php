<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Premium extends Model
{
    use HasFactory;
    protected $table = 'premium';
    protected $fillable = ['service_id', 'prix', 'description', 'durer', 'revisions'];

    public function service()
    {
        return $this->belongsTo(Service::class);
    }
}
