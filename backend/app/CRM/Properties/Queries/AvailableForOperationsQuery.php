<?php

namespace App\CRM\Properties\Queries;

use App\Models\Property;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class AvailableForOperationsQuery
{
    public static function get(Request $request): Builder
    {
        $user = $request->user();

        $query = Property::query()
            ->with([
                'user',
                'propertyType',
                'office',
                'neighborhood',
                'district',
                'municipality'
            ])
            ->where('is_active', true)

            ->whereDoesntHave('operations', function (Builder $q) {
                $q->whereHas('status', function (Builder $statusQuery) {
                    $statusQuery->where('is_closed', false);
                });
            });

        if (!$user->hasAnyRole(['admin', 'god', 'commercial_director'])) {
            $query->where('office_id', $user->office_id);
        } elseif ($request->has('office_id')) {
            $query->where('office_id', $request->office_id);
        }

        $query->when($request->property_type_id, fn($q, $id) => $q->where('property_type_id', $id))
            ->when($request->min_surface_m2, fn($q, $s) => $q->where('built_m2', '>=', $s))
            ->when($request->max_surface_m2, fn($q, $s) => $q->where('built_m2', '<=', $s));

        if ($request->zone_type && $request->zone_id) {
            $column = "{$request->zone_type}_id";
            $query->where($column, $request->zone_id);
        }

        if ($request->min_price || $request->max_price) {
            $query->where(function ($mainQuery) use ($request) {
                $min = $request->min_price;
                $max = $request->max_price;
                $type = $request->operation_type;

                if ($type === 'sale') {
                    if ($min) $mainQuery->where('sell_price', '>=', $min);
                    if ($max) $mainQuery->where('sell_price', '<=', $max);
                } elseif ($type === 'rent') {
                    if ($min) $mainQuery->where('rental_price', '>=', $min);
                    if ($max) $mainQuery->where('rental_price', '<=', $max);
                } else {
                    $mainQuery->where(function ($sub) use ($min, $max) {
                        $sub->where(function ($qSale) use ($min, $max) {
                            $qSale->where('is_sell', true);
                            if ($min) $qSale->where('sell_price', '>=', $min);
                            if ($max) $qSale->where('sell_price', '<=', $max);
                        })
                            ->orWhere(function ($qRent) use ($min, $max) {
                                $qRent->where('is_rent', true);
                                if ($min) $qRent->where('rental_price', '>=', $min);
                                if ($max) $qRent->where('rental_price', '<=', $max);
                            });
                    });
                }
            });
        }

        $query->when($request->operation_type, function ($q, $type) {
            $q->where($type === 'sale' ? 'is_sell' : 'is_rent', true);
        });

        $query->when($request->search, function ($q, $search) {
            $search = strtolower($search);
            $q->where(function ($sub) use ($search) {
                $sub->whereRaw('LOWER(title) LIKE ?', ["%{$search}%"])
                    ->orWhereRaw('LOWER(street) LIKE ?', ["%{$search}%"])
                    ->orWhereRaw('LOWER(intern_reference) LIKE ?', ["%{$search}%"]);
            });
        });

        return $query->orderBy('created_at', 'DESC');
    }
}
