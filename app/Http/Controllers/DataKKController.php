<?php

namespace App\Http\Controllers;

use App\Models\MasterKK;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DataKKController extends Controller
{
    public function index(Request $request)
{
    // Ambil semua parameter filter dari request
    $filters = $request->only(['kabupaten', 'no_kk']); // Bisa ditambahkan filter lainnya sesuai kebutuhan

    // Ambil data dari MasterKK dengan filter dan relasi
    $data = MasterKK::with(['data_penduduk', 'alamat.village.district.regency']) // Load relasi
        ->filter($filters) // Terapkan filter dari array
        ->paginate(5); // Batasi hasil dengan pagination

    // Menambahkan globalIndex ke data
    $data->getCollection()->transform(function ($item, $key) use ($data) {
        // Hitung globalIndex berdasarkan halaman dan perPage
        $item->globalIndex = ($data->currentPage() - 1) * $data->perPage() + $key + 1;
        return $item;
    });

    // Kirimkan data dan filter ke frontend
    return Inertia::render('DataKK', [
        'data' => $data,
        'filters' => $filters, // Kirimkan filters sebagai array
    ]);
}



}
