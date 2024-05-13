<?php

use App\Http\Controllers\Dashboard\DashboardEventController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use SebastianBergmann\CodeCoverage\Report\Html\Dashboard;

Route::get('/', [EventController::class, 'index'])->name('index');

Route::prefix('event')->name('user.event.')->group(function () {
    Route::get('/{event}', [EventController::class, 'show'])->name('show');

    Route::get('/{event}/tickets', [EventController::class, 'tickets'])->name('tickets');
    Route::post('/{event}/tickets/order', [EventController::class, 'orderTickets'])->name('orderTickets');
});

Route::prefix('payment')->name('payment.')->group(function () {
    Route::get('/{payment}', [EventController::class, 'payment'])->name('show');
    Route::post('/{payment}', [EventController::class, 'processPayment'])->name('process');
});

Route::prefix('dashboard')->middleware(['auth', 'role:event-organizer|admin'])->name('dashboard.')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Dashboard');
    })->name('index');

    Route::prefix('event')->name('event.')->group(function () {
        Route::get('/', [DashboardEventController::class, 'index'])->name('index');
        Route::get('/create', [DashboardEventController::class, 'create'])->name('create');
        Route::get('/{event}', [DashboardEventController::class, 'show'])->name('show');
        Route::get('/{event}/edit', [DashboardEventController::class, 'edit'])->name('edit');
        Route::post('/', [DashboardEventController::class, 'store'])->name('store');
        Route::patch('/{event}', [DashboardEventController::class, 'update'])->name('update');
        Route::delete('/{event}', [DashboardEventController::class, 'destroy'])->name('destroy');
    });
    Route::prefix('ticket')->name('ticket.')->group(function () {
        Route::get('/', [DashboardEventController::class, 'tickets'])->name('index');
        Route::get('/{ticket}', [DashboardEventController::class, 'showTicket'])->name('show');
        Route::get('/{ticket}/edit', [DashboardEventController::class, 'editTicket'])->name('edit');
        Route::patch('/{ticket}', [DashboardEventController::class, 'updateTicket'])->name('update');
        Route::delete('/{ticket}', [DashboardEventController::class, 'destroyTicket'])->name('destroy');
        Route::get('/create', [DashboardEventController::class, 'createTicket'])->name('create');
        Route::post('/', [DashboardEventController::class, 'storeTicket'])->name('store');
    });

    Route::prefix('order')->name('order.')->group(function () {
        Route::get('/', [DashboardEventController::class, 'orders'])->name('index');
        Route::get('/{order}', [DashboardEventController::class, 'showOrder'])->name('show');
    });



    Route::prefix('admin')->middleware(['auth', 'role:admin'])->name('admin.')->group(function () {
        // Route::resource('categories', DashboardCategoryController::class)->except(['show']);
        // Route::resource('users', DashboardUserController::class)->except(['show']);
        // Route::resource('')
    });
});

Route::get('/test', [EventController::class, 'getParticipant']);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
