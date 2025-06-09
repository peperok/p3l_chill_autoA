<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Penitip extends Model
{
    protected $table = 'penitip';

    protected $fillable = [
        'nama',
        'email',
        'no_telepon',
        'alamat',
        'fee_percentage',
        'status'
    ];

    protected $casts = [
        'fee_percentage' => 'decimal:2'
    ];

    public function merch(): HasMany
    {
        return $this->hasMany(Merch::class, 'id_penitip');
    }
}
