<?php

namespace App\CRM\Properties\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AvailablePropertyResource extends JsonResource
{
    public function toArray(Request $request): array
    {

        $operationType = $request->operation_type ?? ($this->is_rent ? 'rent' : 'sale');

        if (!$operationType) {
            $operationType = $this->is_sell ? 'sale' : 'rent';
        }

        return [
            'id' => $this->ulid,
            'intern_reference' => $this->intern_reference,
            'title' => $this->title,
            'address' => "{$this->street} {$this->number}, {$this->zip_code} " . ($this->municipality?->name ?? ''),
            'property_type' => [
                'id' => $this->property_type_id,
                'name' => $this->propertyType?->name ?? 'Sin tipo',
            ],
            'zone' => [
                'type' => $this->getZoneType(),
                'id' => $this->getZoneId(),
                'name' => $this->getZoneName(),
            ],
            'surface_m2' => (int) $this->built_m2,
            'price' => (float) ($operationType === 'rent' ? $this->rental_price : $this->sell_price),
            'operation_type' => $operationType,
            'is_sell' => (bool) $this->is_sell,
            'is_rent' => (bool) $this->is_rent,
            'office' => [
                'id' => $this->office_id,
                'name' => $this->office?->name ?? 'Oficina no asignada',
            ],
            'main_agent' => [
                'id'   => $this->user_id,
                'name' => $this->user?->name ?? 'Agente sin asignar',
            ],
            'created_at' => $this->created_at?->toISOString(),
        ];
    }
}