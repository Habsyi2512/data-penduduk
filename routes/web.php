<?php

use App\Http\Controllers\AgamaController;
use App\Http\Controllers\DataPendudukController;
use App\Http\Controllers\DebugController;
use App\Http\Controllers\PendudukFormController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SearchController;
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


    Route::get('/dashboard/tambah-penduduk', [PendudukFormController::class, 'index'])->name('tambah-penduduk');
    Route::post('/dashboard/tambah-penduduk/tambah', [PendudukFormController::class, 'store'])->name('penduduk.store');
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
Route::get('/search-desa', [SearchController::class, 'searchDesa']);
Route::get('/api/search-village', [DebugController::class, 'search']);

require __DIR__ . '/auth.php';
