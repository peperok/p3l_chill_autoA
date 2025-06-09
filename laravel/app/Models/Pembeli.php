<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Pembeli extends Model
{
    protected $table = 'pembeli';

    protected $fillable = [
        'email',
        'password',
        'nama',
        'no_telepon',
        'tanggal_lahir',
        'jenis_kelamin',
        'alamat',
        'foto_profil',
        'poin',
        'saldo',
        'status'
    ];

    protected $hidden = [
        'password'
    ];

    protected $casts = [
        'tanggal_lahir' => 'date',
        'saldo' => 'decimal:2',
        'poin' => 'integer'
    ];

    public function pembelian(): HasMany
    {
        return $this->hasMany(Pembelian::class, 'id_pembeli');
    }

    public function alamat(): MorphMany
    {
        return $this->morphMany(Alamat::class, 'addressable');
    }
}
