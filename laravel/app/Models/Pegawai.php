<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pegawai extends Model
{
    protected $table = 'pegawai';

    protected $fillable = [
        'email',
        'password',
        'nama',
        'jabatan',
        'no_telepon',
        'alamat',
        'tanggal_bergabung',
        'gaji',
        'status'
    ];

    protected $hidden = [
        'password'
    ];

    protected $casts = [
        'tanggal_bergabung' => 'date',
        'gaji' => 'decimal:2'
    ];
}
