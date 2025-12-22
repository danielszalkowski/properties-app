<?php

namespace Database\Seeders;

use App\Models\Property;
use App\Models\PropertyType;
use App\Models\OperationStatus;
use App\Models\Operation;
use App\Models\User;
use App\Models\Office;
use App\Models\Location;
use App\Models\Region;
use App\Models\Municipality;
use App\Models\District;
use App\Models\Neighborhood;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PropertyTestSeeder extends Seeder
{
    public function run(): void
    {
        $loc = Location::create(['name' => 'Valencia']);
        $reg = Region::create(['name' => 'L\'Horta Nord', 'location_id' => $loc->id]);
        $mun = Municipality::create(['name' => 'Valencia Capital', 'region_id' => $reg->id]);
        $dist = District::create(['name' => 'Eixample', 'municipality_id' => $mun->id]);
        $neigh = Neighborhood::create(['name' => 'Ruzafa', 'district_id' => $dist->id]);

        $piso = PropertyType::firstOrCreate(['name' => 'Piso']);
        $chalet = PropertyType::firstOrCreate(['name' => 'Chalet']);
        $abierta = OperationStatus::firstOrCreate(['name' => 'En Proceso'], ['is_closed' => false]);
        $cerrada = OperationStatus::firstOrCreate(['name' => 'Vendido'], ['is_closed' => true]);

        $adminId = User::role('admin')->first()->id ?? 1;
        $officeId = Office::first()->id ?? 1;

        Property::create([
            'ulid' => (string) Str::ulid(),
            'intern_reference' => 'DISPO-001',
            'title' => 'Ático en Ruzafa',
            'is_active' => true,
            'is_sell' => true,
            'sell_price' => 250000,
            'built_m2' => 90,
            'office_id' => $officeId,
            'property_type_id' => $piso->id,
            'user_id' => $adminId,
            'location_id' => $loc->id,
            'region_id' => $reg->id,
            'municipality_id' => $mun->id,
            'district_id' => $dist->id,
            'neighborhood_id' => $neigh->id,
        ]);

        Property::factory()->create([
            'title' => 'Piso invisible (Inactivo)',
            'is_active' => false,
        ]);

        $pisoVendido = Property::factory()->create([
            'title' => 'Piso ya vendido (Cerrado)',
            'is_active' => true,
        ]);

        Operation::create([
            'property_id' => $pisoVendido->id,
            'operation_status_id' => $cerrada->id, // <--- El status que pusiste 'is_closed' => true
        ]);

        $properties = Property::factory()->count(50)->create();

        $properties->random(15)->each(function ($property) use ($abierta) {
            Operation::create([
                'property_id' => $property->id,
                'operation_status_id' => $abierta->id,
            ]);
        });
    }
}