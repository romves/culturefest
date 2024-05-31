<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RecentOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $events = Event::with('orders')->get();
        $recentOrders = Order::with(['tickets', 'tickets.ticketType', 'event'])->orderBy('created_at', 'desc')->get();

        // return response()->json($recentOrders);
        return Inertia::render('Dashboard/RecentOrder/Index', [
            'recentOrders' => $recentOrders
        ]);
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
        $event_id = 1;

        $recentOrders = Event::find($event_id)->orders()->with(['tickets', 'tickets.ticketType'])->orderBy('created_at', 'desc')->limit(5)->get();

        return response()->json($recentOrders);
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
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function getByUserId()
    {
        $user_id = auth()->user()->id;

        $recentOrders = Order::with(['tickets', 'tickets.ticketType', 'event'])->where('user_id', $user_id)->orderBy('created_at', 'desc')->limit(5)->get();

        return response()->json($recentOrders);
    }
}


