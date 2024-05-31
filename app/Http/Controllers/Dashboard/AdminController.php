<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function eventManagement()
    {
        $events = Event::with(['images_server', 'categories', 'user', 'ticketTypes'])->get();
        return Inertia::render('Dashboard/Admin/EventManagement', [
            'events' => $events,
        ]);
    }

    public function userManagement()
    {
        $users = User::with('roles')->get();

        return Inertia::render('Dashboard/Admin/UserManagement', [
            'users' => $users,
        ]);
    }

    public function approveEvent(Event $event)
    {
        $event->update([
            'status' => 'accepted',
        ]);

        return redirect()->back();
    }

    public function rejectEvent(Event $event)
    {
        $event->update([
            'status' => 'declined',
        ]);

        return redirect()->back();
    }
}
