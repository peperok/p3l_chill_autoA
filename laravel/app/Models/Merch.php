<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Merch extends Model
{
    protected $table = 'merch';

    protected $fillable = [
        'nama_merch',
        'deskripsi',
        'kategori',
        'harga',
        'stok',
        'kondisi',
        'foto_utama',
        'foto_tambahan',
        'rating',
        'jumlah_review',
        'status',
        'id_penitip'
    ];

    protected $casts = [
        'harga' => 'decimal:2',
        'rating' => 'decimal:2',
        'stok' => 'integer',
        'jumlah_review' => 'integer',
        'foto_tambahan' => 'array'
    ];

    public function penitip(): BelongsTo
    {
        return $this->belongsTo(Penitip::class, 'id_penitip');
    }

    public function detailPembelian(): HasMany
    {
        return $this->hasMany(DetailPembelian::class, 'id_merch');
    }
}
