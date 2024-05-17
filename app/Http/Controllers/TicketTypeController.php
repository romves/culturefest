<?php

namespace App\Http\Controllers;

use App\Models\TicketType;
use Illuminate\Http\Request;

class TicketTypeController extends Controller
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
    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string',
                'price' => 'required|numeric',
                'max_tickets' => 'required|numeric',
            ]);

            $ticketType = new TicketType();

            $ticketType->name = $request->name;
            $ticketType->price = $request->price;
            $ticketType->max_tickets = $request->max_tickets;

            $ticketType->event_id = $request->event_id;

            $ticketType->save();

            // dd($ticketType->toArray());

            // return response()->json($ticketType, 201);
            return redirect()->back()->withSuccess('Ticket created successfully');
        } catch (\Exception $e) {
            // return response()->json($e->getMessage(), 500);
            return redirect()->back()->withError($e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TicketType $ticketType)
    {
        try {
            $request->validate([
                'name' => 'required|string',
                'price' => 'required|numeric',
                'max_tickets' => 'required|numeric',
            ]);

            $ticketType->name = $request->name;
            $ticketType->price = $request->price;
            $ticketType->max_tickets = $request->max_tickets;

            $ticketType->event_id = $ticketType->event_id;


            $ticketType->save();

            return redirect()->back()->withSuccess('Ticket updated successfully');
        } catch (\Exception $e) {
            return redirect()->back()->withError($e->getMessage());
        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TicketType $ticketType)
    {
        try {
            if (!$ticketType) {
                return response()->json('Ticket type not found', 404);
            }

            $ticketType->delete();

            // return response()->json('Ticket delete success', 204);
            return redirect()->back()->withSuccess('Ticket delete successfully');
        } catch (\Exception $e) {
            return redirect()->back()->withError($e->getMessage());
        }
    }
}
