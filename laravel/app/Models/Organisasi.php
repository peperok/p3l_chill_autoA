<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Organisasi extends Model
{
    protected $table = 'organisasi';

    protected $fillable = [
        'email',
        'password',
        'nama_organisasi',
        'deskripsi',
        'no_telepon',
        'alamat',
        'website',
        'bidang_kegiatan',
        'logo',
        'status'
    ];

    protected $hidden = [
        'password'
    ];

    public function alamat(): MorphMany
    {
        return $this->morphMany(Alamat::class, 'addressable');
    }
}
