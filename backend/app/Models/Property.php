<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUlids;

class Property extends Model
{
    use HasFactory, HasUlids;

    public function uniqueIds(): array
    {
        return ['ulid'];
    }

    protected $fillable = [
        'intern_reference',
        'title',
        'street',
        'number',
        'zip_code',
        'is_active',
        'is_sell',
        'is_rent',
        'sell_price',
        'rental_price',
        'built_m2',
        'office_id',
        'property_type_id',
        'user_id',
        'secondary_user_id',
        'neighborhood_id',
        'district_id',
        'municipality_id',
        'region_id',
        'location_id'
    ];

    protected $casts = [
        'is_active'    => 'boolean',
        'is_sell'      => 'boolean',
        'is_rent'      => 'boolean',
        'sell_price'   => 'decimal:2',
        'rental_price' => 'decimal:2',
        'built_m2'     => 'integer',
    ];

    public function getZoneId()
    {
        return $this->neighborhood_id ?? $this->district_id ?? $this->municipality_id;
    }

    public function getZoneName()
    {
        if ($this->neighborhood_id) return $this->neighborhood?->name;
        if ($this->district_id) return $this->district?->name;
        return $this->municipality?->name ?? 'Desconocida';
    }

    public function getZoneType()
    {
        if ($this->neighborhood_id) return 'neighborhood';
        if ($this->district_id) return 'district';
        return 'municipality';
    }

    public function propertyType()
    {
        return $this->belongsTo(PropertyType::class);
    }
    public function office()
    {
        return $this->belongsTo(Office::class);
    }
    public function operations()
    {
        return $this->hasMany(Operation::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function secondaryUser()
    {
        return $this->belongsTo(User::class, 'secondary_user_id');
    }

    public function neighborhood()
    {
        return $this->belongsTo(Neighborhood::class);
    }
    public function district()
    {
        return $this->belongsTo(District::class);
    }
    public function municipality()
    {
        return $this->belongsTo(Municipality::class);
    }
    public function region()
    {
        return $this->belongsTo(Region::class);
    }
    public function location()
    {
        return $this->belongsTo(Location::class);
    }
}