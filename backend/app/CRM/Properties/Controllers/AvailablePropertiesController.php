<?php

namespace App\CRM\Properties\Controllers;

use App\Http\Controllers\Controller;
use App\CRM\Properties\Queries\AvailableForOperationsQuery;
use App\CRM\Properties\Requests\AvailableForOperationsRequest;
use App\CRM\Properties\Resources\AvailablePropertyResource;
use Illuminate\Http\JsonResponse;

class AvailablePropertiesController extends Controller
{
    public function index(AvailableForOperationsRequest $request): JsonResponse
    {
        $query = AvailableForOperationsQuery::get($request);

        $perPage = min($request->get('per_page', 20), 50);
        $properties = $query->paginate($perPage);

        return response()->json([
            'data' => AvailablePropertyResource::collection($properties)->resolve(),
            'meta' => [
                'current_page' => $properties->currentPage(),
                'per_page'     => $properties->perPage(),
                'total'        => $properties->total(),
                'last_page'    => $properties->lastPage(),
            ]
        ]);
    }
}
