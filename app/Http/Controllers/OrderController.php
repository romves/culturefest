<?php

namespace App\Http\Controllers;

use App\Helpers\OrderHelper;
use App\Models\Order;
use App\Http\Requests\UpdateOrderRequest;
use App\Models\Event;
use App\Models\Ticket;
use App\Models\TicketType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function orderTickets(Request $request, String $event_slug)
    {
        $request->validate([
            'tickets' => 'required|array',
            'status' => 'required|string',
            'payment_method' => 'required|string',
        ]);

        $user_id = '01hxhqegxpsqmh9es064v61jy5';

        $existingEvent = Event::where('slug', $event_slug)->first();
        if (!$existingEvent) {
            return response()->json(['message' => 'Event not found'], 404);
        }

        try {
            $ticket_sold = $existingEvent->tickets()->count();

            if ($ticket_sold >= $existingEvent->max_participants) {
                return response()->json(['message' => 'Ticket sold out'], 400);
            }

            $order = new Order();
            $order->user_id = $user_id;
            $order->order_code = 'ORDER-' . uniqid();
            $order->total_price = OrderHelper::calculateOrderTotal($request->all());
            $order->payment_method = $request->payment_method;

            DB::beginTransaction();

            $order->save();


            foreach ($request->tickets as $ticket) {
                $ticketTypeId = $ticket['ticket_type_id'];
                $quantity = $ticket['quantity'];

                $ticketType = TicketType::find($ticketTypeId);

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

            DB::commit();

            return response()->json(['message' => 'Order created successfully'], 201);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(['message' => 'Failed to create order' . $th ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrderRequest $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }
}
