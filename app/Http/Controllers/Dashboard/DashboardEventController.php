<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\EventCategory;
use App\Models\UploadedFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Str;

class DashboardEventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $events = Event::all();

        return Inertia::render('Dashboard/Events/Index', [
            'events' => $events,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Dashboard/Events/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'required|string',
                'start_date' => 'required|date',
                'end_date' => 'required|date',
                'location' => 'required|string',
                'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);

            /** @var \App\Models\User  */
            $user = Auth::user();
            $user_id = $user->id;

            if (!$user || $user->hasRole(['event-organizer', 'admin']) === false) {
                return response()->json(['message' => 'You are not authorized to create events.'], 403);
            }

            $uploadedFile = $request->file('image');

            $fileName = hash('sha256', $uploadedFile->getClientOriginalName()) . '-' . time() . '.' . $uploadedFile->getClientOriginalExtension();
            $filePath = $uploadedFile->storeAs('events/' . $request->name . '/file_uploads', $fileName);

            $file = new UploadedFile();
            $event = new Event();

            $file->filename = $file->original_filename = $uploadedFile->getClientOriginalName();
            $file->file_path = 'storage/' . $filePath;

            $event->user_id = $user_id;
            $event->name = $request->name;
            $event->slug = Str::slug($request->name);
            $event->description = $request->description;
            $event->start_date = $request->start_date;
            $event->end_date = $request->end_date;
            $event->location = $request->location;
            $event->max_participants = $request->max_participants;
            $event->image_url = $file->file_path;
            $event->save();

            $file->event_id = $event->id;
            $file->save();


            // return response()->json(['message' => 'Event created successfully!', 'event' => $event]);
            return redirect()->route('dashboard.event.index')->with('message', 'Event created successfully!');
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'An error occurred while creating the event.', 'error' =>
                $th->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $slug)
    {
        $event = Event::where('slug', $slug)->first();

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
        $categories = EventCategory::all();
        $event = Event::with(['ticketTypes', 'categories'])->find($event->id);

        return Inertia::render('Dashboard/Events/Edit', [
            'event' => $event,
            'event_categories' => $categories,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Event $event)
    {
        $event->update($request->all());

        // return response()->json(['message' => 'Event updated successfully!', 'event' => $event]);
        return redirect()->route('dashboard.event.index')->with('message', 'Event updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        $event->delete();

        // return response()->json(['message' => 'Event deleted successfully!']);
        return redirect()->back()->with('message', 'Event deleted successfully!');
    }
}
