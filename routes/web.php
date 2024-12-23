<?php

use App\Http\Controllers\AgamaController;
use App\Http\Controllers\ArsipSampahController;
use App\Http\Controllers\DataKKController;
use App\Http\Controllers\DataPendudukController;
use App\Http\Controllers\DebugController;
use App\Http\Controllers\FormKKController;
use App\Http\Controllers\GolDarahController;
use App\Http\Controllers\KewarganegaraanController;
use App\Http\Controllers\MasterDataController;
use App\Http\Controllers\PekerjaanController;
use App\Http\Controllers\PemohonController;
use App\Http\Controllers\PendudukFormController;
use App\Http\Controllers\PindahKKController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\StatusKawinController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/logout', [ProfileController::class, 'logout'])->name('logout');

    // Route Dashboard
    Route::get('/dashboard/tambah-penduduk', [PendudukFormController::class, 'index'])->name('tambah-penduduk');
    Route::post('/dashboard/tambah-penduduk/tambah', [PendudukFormController::class, 'store'])->name('penduduk.store');

    // route KK
    Route::get('/dashboard/data-kk', [DataKKController::class, 'index'])->name('kk.display');
    Route::get('/dashboard/buat-kk', [FormKKController::class, 'index'])->name('kk.display.form');
    Route::post('/dashboard/buat-kk', [FormKKController::class, 'store'])->name('kk.store.form');
    Route::get('/dashboard/pindah-kk', [PindahKKController::class, 'index'])->name('kk.pindah.display');
    Route::post('/dashboard/pindah-kk', [PindahKKController::class, 'update'])->name('kk.pindah.form');
    
    // edit data
    Route::get('/dashboard/penduduk/edit', [PendudukFormController::class, 'edit'])->name('penduduk.edit');
    Route::put('/dashboard/penduduk/update', [PendudukFormController::class, 'update'])->name('penduduk.update');
    Route::delete('/dashboard/penduduk/delete', [DataPendudukController::class, 'delete'])->name('penduduk.delete');


    // route arsip sampah
    Route::get('/dashboard/arsip-biodata', [ArsipSampahController::class, 'displayBioata'])->name('arsip.biodata');
    Route::get('/dashboard/arsip-kartu-keluarga', [ArsipSampahController::class, 'displayKartuKeluarga'])->name('arsip.KK');

    // route Agama
    Route::get('/dashboard/data-agama', [AgamaController::class, 'index'])->name('data-agama');
    Route::post('dashboard/data-agama', [AgamaController::class, 'store'])->name('data-agama.store');
    Route::get('/dashboard/data-agama/{$id}/edit', [AgamaController::class, 'edit'])->name('data-agama.edit');
    Route::put('/dashboard/data-agama/{$id}', [AgamaController::class, 'update'])->name('data-agama.update');

    // Route Golongan Darah
    Route::get('/dashboard/data-gol-darah', [GolDarahController::class, 'index'])->name('data-gol-darah');
    Route::post('/dashboard/data-gol-darah', [GolDarahController::class, 'store'])->name('data-gol-darah.store');

    // Route Status Kawin
    Route::get('/dashboard/data-status-kawin', [StatusKawinController::class, 'index'])->name('data-status-kawin');
    Route::post('/dashboard/data-status-kawin', [StatusKawinController::class, 'store'])->name('data-status-kawin.store');

    // Route Pekerjaan
    Route::get('/dashboard/data-pekerjaan', [PekerjaanController::class, 'index'])->name('data-pekerjaan');
    Route::post('/dashboard/data-pekerjaan', [PekerjaanController::class, 'store'])->name('data-pekerjaan.store');

    // Route Kewarganegaraan
    Route::get('/dashboard/data-kewarganegaraan', [KewarganegaraanController::class, 'index'])->name('data-kewarganegaraan');
    Route::post('/dashboard/data-kewarganegaraan', [KewarganegaraanController::class, 'store'])->name('data-kewarganegaraan.store');

    // Route Permohonan
    Route::get('/dashboard/permohonan',[PemohonController::class, 'index'])->name('permohonan');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/population', [DataPendudukController::class, 'index'])->name('population_data');

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('population-data/create', [DataPendudukController::class, 'create'])->name('insert_population.create');
    Route::post('/population-data', [DataPendudukController::class, 'store'])->name('insert_population.store');

    Route::get('/agama', [AgamaController::class, 'index']);
});

Route::get('/debug', [DebugController::class, 'index']);

Route::prefix('search')->group(function(){
    Route::get('/searchDesa', [SearchController::class, 'searchDesa']);
    Route::get('/searchNIK', [SearchController::class, 'searchNIK']);
    Route::get('/searchKK', [SearchController::class, 'searchKK']);
});

Route::prefix('api')->group(function(){
    Route::get('/getStatusHubungan', [MasterDataController::class, 'getStatusHubungan']);
    Route::get('/getDetailKKByNoKK/{no_kk}', [MasterDataController::class, 'getDetailKKByNoKK']);
});


require __DIR__ . '/auth.php';
