<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventCategory extends Model
{
    use HasFactory;

    public function events()
    {
        return $this->belongsToMany(Event::class, 'event_category_mapping', 'event_category_id', 'event_id');
    }
}
