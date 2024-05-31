<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $events = Event::with('categories')->get();
        return Inertia::render('Home', [
            'events' => $events
        ]);
    }
}
