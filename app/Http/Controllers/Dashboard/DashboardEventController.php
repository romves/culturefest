<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\UploadedFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

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
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            /** @var \App\Models\User  */
            $user = Auth::user();
            $user_id = $user->id;

            if ($user->hasRole(['event-organizer', 'admin']) === false) {
                return response()->json(['message' => 'You are not authorized to create events.'], 403);
            }

            $request->validate();
            $uploadedFile = $request->file('image');

            $fileName = hash('sha256', $uploadedFile->getClientOriginalName()) . '-' . time() . '.' . $uploadedFile->getClientOriginalExtension();
            $filePath = $uploadedFile->storeAs('events/' . $request->name . '/file_uploads', $fileName);

            $file = new UploadedFile();
            $file->filename =
                $file->original_filename = $uploadedFile->getClientOriginalName();
            $file->file_path = $filePath;
            $file->user_id = $user_id;
            $file->save();

            $event = new Event();
            $event->user_id = $user_id;
            $event->name = $request->input('name');
            $event->description = $request->input('description');
            $event->start_date = $request->input('start_date');
            $event->end_date = $request->input('end_date');
            $event->location = $request->input('location');
            $event->max_participants = $request->input('max_participants');
            $event->is_seated = $request->input('is_seated');
            $event->image_url = $file->id;

            $event->save();


            return response()->json(['message' => 'Event created successfully!', 'event' => $event]);
            // return redirect()->route('events.index');

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
}
