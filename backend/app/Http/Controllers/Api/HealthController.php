<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class HealthController extends Controller
{
    /**
     * GET /api/health - Comprueba la conexión a la base de datos (SQLite).
     */
    public function __invoke()
    {
        $dbStatus = 'error';

        try {
            DB::connection()->getPdo();
            $dbStatus = 'ok';
        } catch (\Exception $e) {
            report($e);
        }

        return response()->json([
            'data' => [
                'db' => $dbStatus
            ],
            'message' => null,
            'errors' => null,
        ]);
    }
}