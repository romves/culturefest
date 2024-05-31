<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\EventCategory;
use App\Models\UploadedFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;

class DashboardEventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $events = Event::with(['images_server', 'categories'])->get();

        return Inertia::render('Dashboard/Events/Index', [
            'events' => $events,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = EventCategory::all();
        return Inertia::render('Dashboard/Events/Create', [
            'event_categories' => $categories,
        ]);
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
                'images' => 'array',
            ]);

            /** @var \App\Models\User  */
            $user = Auth::user();
            $user_id = $user->id;

            if (!$user || $user->hasRole(['event-organizer', 'admin']) === false) {
                return response()->json(['message' => 'You are not authorized to create events.'], 403);
            }

            $event = new Event();

            $event->user_id = $user_id;
            $event->name = $request->name;
            $event->slug = Str::slug($request->name);
            $event->description = $request->description;
            $event->start_date = $request->start_date;
            $event->end_date = $request->end_date;
            $event->location = $request->location;
            $event->max_participants = $request->max_participants;
            $event->save();


            foreach ($request->images as $image) {
                $fileName = hash('sha256', $image->getClientOriginalName()) . '-' . time() . '.' . $image->getClientOriginalExtension();
                $filePath = $image->storeAs('events/' . $event->id . '/images', $fileName);
                // $filePath = Storage::putFileAs('events/' . $event->id . '/images', $fileName);

                $file = new UploadedFile();

                $file->filename = $file->original_filename = $image->getClientOriginalName();
                $file->file_path = 'storage/' . $filePath;
                $file->event_id = $event->id;
                $file->save();
            }

            return response()->json(['message' => 'Event created successfully!', 'event' => $event]);
            // return redirect()->route('dashboard.event.index')->with('message', 'Event created successfully!');
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
        $event = Event::with(['ticketTypes', 'categories', 'images_server'])->find($event->id);

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
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'required|string',
                'start_date' => 'required|date',
                'end_date' => 'required|date',
                'location' => 'required|string',
            ]);

            if ($request->images != null) {
                foreach ($request->images as $image) {
                    $fileName = hash('sha256', $image->getClientOriginalName()) . '-' . time() . '.' . $image->getClientOriginalExtension();
                    $filePath = $image->storeAs('events/' . $event->id . '/images', $fileName);
                    // $filePath = Storage::putFileAs('events/' . $event->id . '/images', $fileName);

                    $file = new UploadedFile();

                    $file->filename = $file->original_filename = $image->getClientOriginalName();
                    $file->file_path = 'storage/' . $filePath;
                    $file->event_id = $event->id;
                    $file->save();
                }
            }

            if ($request->categories != null) {
                $event->categories()->sync($request->categories);
            }


            $event->update($request->all());

            // return response()->json(['message' => 'Event updated successfully!', 'event' => $event]);
            return redirect()->route('dashboard.event.edit', $event->id)->with('message', 'Event updated successfully!');
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'An error occurred while updating the event.', 'error' =>
                $th->getMessage()
            ], 500);
        }
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

    public function deleteImage(String $image_id)
    {
        $file = UploadedFile::find($image_id);
        $file_path = str_replace('storage/', '', $file->file_path);;

        if (!$file || !Storage::exists($file_path)) {
            return redirect()->back()->withErrors('message', 'Image not found!');
        }

        try {
            DB::beginTransaction();
            Storage::disk('public')->delete($file_path);

            $file->delete();

            DB::commit();
            return redirect()->back()->with('message', 'Image deleted successfully!');
        } catch (\Throwable $th) {
            DB::rollBack();
            return redirect()->back()->with('message', 'An error occurred while deleting the image.');
        }
    }

    public function verifyEvent(Event $event)
    {
        $event->verified = true;
        $event->save();

        return redirect()->back()->with('message', 'Event verified successfully!');
    }
}
