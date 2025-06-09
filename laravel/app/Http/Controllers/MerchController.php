<?php

namespace App\Http\Controllers;

use App\Models\Merch;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MerchController extends Controller
{
    public function index()
    {
        $merch = Merch::with('penitip')->where('status', 'aktif')->get();
        
        $formattedMerch = $merch->map(function ($item) {
            return [
                'id' => $item->id,
                'nama_merch' => $item->nama_merch,
                'deskripsi' => $item->deskripsi,
                'kategori' => $item->kategori,
                'harga' => (string) $item->harga,
                'stok' => $item->stok,
                'kondisi' => $item->kondisi,
                'foto_utama' => $item->foto_utama,
                'foto_tambahan' => $item->foto_tambahan,
                'rating' => $item->rating ? (string) $item->rating : null,
                'jumlah_review' => $item->jumlah_review,
                'status' => $item->status,
                'id_penitip' => $item->id_penitip
            ];
        });

        return response()->json([
            'message' => 'Data retrieved successfully',
            'data' => $formattedMerch
        ]);
    }

    public function show($id)
    {
        $merch = Merch::with('penitip')->find($id);

        if (!$merch) {
            return response()->json([
                'message' => 'Product not found'
            ], 404);
        }

        return response()->json([
            'message' => 'Product retrieved successfully',
            'data' => [
                'id' => $merch->id,
                'nama_merch' => $merch->nama_merch,
                'deskripsi' => $merch->deskripsi,
                'kategori' => $merch->kategori,
                'harga' => (string) $merch->harga,
                'stok' => $merch->stok,
                'kondisi' => $merch->kondisi,
                'foto_utama' => $merch->foto_utama,
                'foto_tambahan' => $merch->foto_tambahan,
                'rating' => $merch->rating ? (string) $merch->rating : null,
                'jumlah_review' => $merch->jumlah_review,
                'status' => $merch->status,
                'id_penitip' => $merch->id_penitip
            ]
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama_merch' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'kategori' => 'nullable|string',
            'harga' => 'required|numeric|min:0',
            'stok' => 'required|integer|min:0',
            'kondisi' => 'nullable|string',
            'foto_utama' => 'nullable|string',
            'foto_tambahan' => 'nullable|array',
            'id_penitip' => 'nullable|exists:penitip,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 400);
        }

        $merch = Merch::create([
            'nama_merch' => $request->nama_merch,
            'deskripsi' => $request->deskripsi,
            'kategori' => $request->kategori,
            'harga' => $request->harga,
            'stok' => $request->stok,
            'kondisi' => $request->kondisi,
            'foto_utama' => $request->foto_utama,
            'foto_tambahan' => $request->foto_tambahan,
            'status' => 'aktif',
            'id_penitip' => $request->id_penitip
        ]);

        return response()->json([
            'message' => 'Product created successfully',
            'data' => [
                'id' => $merch->id,
                'nama_merch' => $merch->nama_merch,
                'deskripsi' => $merch->deskripsi,
                'kategori' => $merch->kategori,
                'harga' => (string) $merch->harga,
                'stok' => $merch->stok,
                'kondisi' => $merch->kondisi,
                'foto_utama' => $merch->foto_utama,
                'foto_tambahan' => $merch->foto_tambahan,
                'rating' => $merch->rating,
                'jumlah_review' => $merch->jumlah_review,
                'status' => $merch->status,
                'id_penitip' => $merch->id_penitip
            ]
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $merch = Merch::find($id);

        if (!$merch) {
            return response()->json([
                'message' => 'Product not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'nama_merch' => 'sometimes|required|string|max:255',
            'deskripsi' => 'nullable|string',
            'kategori' => 'nullable|string',
            'harga' => 'sometimes|required|numeric|min:0',
            'stok' => 'sometimes|required|integer|min:0',
            'kondisi' => 'nullable|string',
            'foto_utama' => 'nullable|string',
            'foto_tambahan' => 'nullable|array',
            'status' => 'nullable|string',
            'id_penitip' => 'nullable|exists:penitip,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 400);
        }

        $merch->update($request->only([
            'nama_merch', 'deskripsi', 'kategori', 'harga', 'stok',
            'kondisi', 'foto_utama', 'foto_tambahan', 'status', 'id_penitip'
        ]));

        return response()->json([
            'message' => 'Product updated successfully',
            'data' => [
                'id' => $merch->id,
                'nama_merch' => $merch->nama_merch,
                'deskripsi' => $merch->deskripsi,
                'kategori' => $merch->kategori,
                'harga' => (string) $merch->harga,
                'stok' => $merch->stok,
                'kondisi' => $merch->kondisi,
                'foto_utama' => $merch->foto_utama,
                'foto_tambahan' => $merch->foto_tambahan,
                'rating' => $merch->rating,
                'jumlah_review' => $merch->jumlah_review,
                'status' => $merch->status,
                'id_penitip' => $merch->id_penitip
            ]
        ]);
    }

    public function destroy($id)
    {
        $merch = Merch::find($id);

        if (!$merch) {
            return response()->json([
                'message' => 'Product not found'
            ], 404);
        }

        $merch->delete();

        return response()->json([
            'message' => 'Product deleted successfully'
        ]);
    }
}
