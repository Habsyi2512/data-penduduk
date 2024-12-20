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
    $data = MasterKK::with('village.district.regency') // Eager loading relasi
                    ->filter($filters) // Filter data sesuai parameter yang diberikan
                    ->paginate(5);

    // Menambahkan globalIndex ke data
    $data->getCollection()->transform(function ($item, $key) use ($data) {
        // Hitung globalIndex berdasarkan halaman dan perPage
        $item->globalIndex = ($data->currentPage() - 1) * $data->perPage() + $key + 1;
        return $item;
    });

    // Load relasi data_penduduk setelah data dipaginate
    $data->load('data_penduduk');

    // Kirimkan data dan filter ke frontend
    return Inertia::render('DataKK', [
        'data' => $data,
        'filters' => $filters, // Kirimkan filters sebagai array
    ]);
}



}
