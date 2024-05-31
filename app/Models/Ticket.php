<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;

    protected $fillable = [
        'price',
        'event_id',
        'order_id',
    ];

    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function ticketType()
    {
        return $this->belongsTo(TicketType::class);
    }

    public static function generateTicketCode()
    {
        return 'TICKET-' . uniqid().strtoupper(substr(str_shuffle('ABCDEFGHIJKLMNOPQRSTUVWXYZ'), 0, 3));
    }
}
