<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateEventRequest;
use App\Models\UploadedFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Str;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // get event with status accepted
        $events = Event::where('status', 'accepted')->with('categories', 'images_server')->get();

        // $events = Event::with('categories', 'images_server')->get();

        return Inertia::render('Events/Index', [
            'events' => $events,
        ]);
    }

    public function orderTicket(Request $request, string $event_slug)
    {
        // get event from slug
        $event = Event::with('categories', 'images_server', 'ticketTypes')->where('slug', $event_slug)->first();

        return Inertia::render('Events/Slug/Order/Index', [
            'event' => $event,
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
    public function show(string $slug)
    {
        // $event = Event::where('slug', $slug)->first();
        $event = Event::where('slug', $slug)->with('categories', 'images_server', 'ticketTypes')->first();

        // return response()->json($event);
        return Inertia::render('Events/Slug/Index', [
            'event' => $event,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Event $event)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Event $event)
    {
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        //
    }

    public function getParticipant()
    {
        try {

            $event = new Event();

            $participants = $event->participants();

            return response()->json($participants);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'An error occurred while fetching participants.', 'error' =>
                $th->getMessage()
            ], 500);
        }
    }
}
