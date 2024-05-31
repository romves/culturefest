<?php

namespace App\Services;

use App\Models\Order;
use Midtrans\Config;
use Midtrans\CoreApi;

class MidtransService
{
    public function __construct()
    {
        Config::$serverKey = env('MIDTRANS_SERVER_KEY');
        Config::$clientKey = env('MIDTRANS_CLIENT_KEY');
        Config::$isProduction = false;
        Config::$isSanitized = true;
        Config::$is3ds = true;
    }


    public function charge(Order $order)
    {
        $transactionPayload = array(
            'bank_transfer' => array(
                'bank' => 'bri',
            ),
            'payment_type' => 'bank_transfer',
            'transaction_details' => array(
                'order_id' => $order->order_code,
                'gross_amount' => floor($order->total_price),
            ),
        );

        try {
            $charge = CoreApi::charge($transactionPayload);
            if (!$charge) {
                return [
                    'status' => 'error',
                    'message' => 'Transaction failed',
                ];
            }

            return [
                'status' => 'success',
                'data' => $charge,
            ];
        } catch (\Exception $e) {
            return [
                'status' => 'error',
                'message' => $e->getMessage(),
            ];
        }
    }
}
