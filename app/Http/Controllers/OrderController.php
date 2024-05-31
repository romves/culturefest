<?php

namespace App\Http\Controllers;

use App\Helpers\OrderHelper;
use App\Models\Order;
use App\Http\Requests\UpdateOrderRequest;
use App\Models\Event;
use App\Models\Ticket;
use App\Models\TicketType;
use App\Services\MidtransService;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Midtrans\CoreApi;

class OrderController extends Controller
{
    public function orderTickets(Request $request, String $event_slug)
    {
        try {
            $request->validate([
                'tickets' => 'required|array',
                'payment_method' => 'required|string',
            ]);

            // $user_id = '01hycv9261fff30by75k8f76y8';
            $user_id = auth()->user()->id;

            $existingEvent = Event::where('slug', $event_slug)->first();
            if (!$existingEvent) {
                return response()->json(['message' => 'Event not found'], 404);
            }

            $order = new Order();
            $order->user_id = $user_id;
            $order->order_code = 'ORDER-' . str(now()->format('YmdHis'));
            $order->payment_method = $request->payment_method;
            $order->total_price = OrderHelper::calculateOrderTotal($request->all());
            $order->event_id = $existingEvent->id;
            $order->payload = null;
            DB::beginTransaction();

            $order->save();

            foreach ($request->tickets as $ticket) {
                $ticketTypeId = $ticket['ticket_type_id'];
                $quantity = $ticket['quantity'];

                $soldTicket = Ticket::where('ticket_type_id', $ticketTypeId)->count();
                $ticketType = TicketType::find($ticketTypeId);

                if ($soldTicket > $ticketType->max_tickets) {
                    return response()->json(['message' => 'Ticket type is sold out'], 400);
                }

                if ($ticketType) {
                    for ($i = 0; $i < $quantity; $i++) {
                        $newTicket = new Ticket();
                        $newTicket->ticket_code = Ticket::generateTicketCode();
                        $newTicket->user_id = $user_id;
                        $newTicket->event_id = $existingEvent->id;
                        $newTicket->order_id = $order->id;
                        $newTicket->ticket_type_id = $ticketType->id;

                        $newTicket->save();
                    }
                }
            }

            $midtransService = new MidtransService();

            $data = $midtransService->charge($order);

            if ($data['status'] === 'error') {
                return response()->json(['message' => $data['message']], 400);
            }

            $order->payload = json_encode($data['data']);

            $order->save();

            DB::commit();

            // return response()->json(['message' => 'Order created successfully'], 201);
            // return redirect()->back()->withSuccess('Order created successfully');
            return redirect()->route('order.payment', $order->order_code);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(['message' => 'Failed to create order' . $th], 500);
        }
    }

    public function showPayment(String $order_code)
    {
        $order = Order::where('order_code', $order_code)->first();

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        return Inertia::render('Payment/Index', [
            'order' => $order,
        ]);
    }

    public function handlePaymentNotification(Request $request)
    {
        $data = $request->all();

        Log::info('incoming-midtrans', [
            'payload' => $data,
        ]);

        $serverKey = env('MIDTRANS_SERVER_KEY');
        $signatureKey = hash('sha512', $data['order_id'] . $data['status_code'] . $data['gross_amount'] . $serverKey);

        if ($signatureKey !== $data['signature_key']) {
            return response()->json(['message' => 'Invalid signature'], 403);
        }

        $order = Order::where('order_code', $data['order_id'])->first();

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        switch ($data['transaction_status']) {
            case 'capture':
                if ($data['fraud_status'] === 'accept') {
                    $order->status = 'paid';
                }
                break;
            case 'settlement':
                $order->status = 'paid';
                break;
            case 'pending':
                $order->status = 'pending';
                break;
            case 'deny':
            case 'expire':
            case 'cancel':
                $order->status = 'failed';
                break;
        }

        $order->save();

        return response()->json(['message' => 'Notification processed successfully']);
    }

    public function getPaymentStatus(String $order_code)
    {
        $order = Order::where('order_code', $order_code)->first();

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        return response()->json(['status' => $order->status]);
    }
}
