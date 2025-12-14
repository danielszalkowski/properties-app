<?php

use App\Http\Controllers\Api\NoteController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;

Route::get('/health', function () {
    try {
        DB::connection()->getPdo();
        return response()->json(['db' => 'ok']);
    } catch (\Exception $e) {
        return response()->json(['db' => 'error'], 500);
    }
});

Route::apiResource('notes', NoteController::class);

// Route::get('/notes', [ApiNoteController::class, 'index']);
// Route::post('/notes', [ApiNoteController::class, 'store']);
// Route::get('/notes/{id}', [ApiNoteController::class, 'show']);
// Route::put('/notes/{id}', [ApiNoteController::class, 'update']);
// Route::delete('/notes/{id}', [ApiNoteController::class, 'destroy']);
