<?php

use App\Http\Controllers\Api\HealthController;
use App\Http\Controllers\Api\NoteController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;

Route::get('/health', HealthController::class);

Route::apiResource('notes', NoteController::class);