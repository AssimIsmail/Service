<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Basic extends Model
{
    use HasFactory;
    protected $table = 'basics';
    protected $fillable = ['service_id', 'prix', 'description', 'durer', 'revisions'];

    public function service()
    {
        return $this->belongsTo(Service::class);
    }
}
