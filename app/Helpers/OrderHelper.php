<?php

namespace App\Helpers;

use App\Models\TicketType;

class OrderHelper {
    public static function calculateOrderTotal(array $requestData): float
    {
        $totalPrice = 0.0;

        foreach ($requestData['tickets'] as $ticket) {
            $ticketTypeId = $ticket['ticket_type_id'];
            $quantity = $ticket['quantity'];

            $ticketType = TicketType::find($ticketTypeId);

            if ($ticketType) {
                $subtotal = $ticketType->price * $quantity;
                $totalPrice += $subtotal;
            }
        }

        return $totalPrice;
    }
}
