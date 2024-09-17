<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\Dashboard\AdminController as DashboardAdminController;
use App\Http\Controllers\Dashboard\DashboardEventController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Dashboard\RecentOrderController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\TicketTypeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get(
    '/',
    [HomeController::class, 'index']
)->name('index');

Route::prefix('events')->name('user.event.')->group(function () {
    Route::get('/', [EventController::class, 'index'])->name('index');
    Route::get('/{event}', [EventController::class, 'show'])->name('show');
    Route::get('/{event_slug}/order', [EventController::class, 'orderTicket'])->name('orderTicket');
    // Route::get('/{event_slug}/tickets', [EventController::class, 'tickets'])->name('tickets');
});

Route::prefix('order')->middleware('auth')->name('order.')->group(function () {
    Route::post('/{event_slug}/tickets/order', [OrderController::class, 'orderTickets'])->name('orderTickets');
    Route::get('/{order}/payment', [OrderController::class, 'showPayment'])->name('payment');
});

// Route::prefix('payment')->name('payment.')->group(function () {
//     Route::get('/{payment}', [EventController::class, 'payment'])->name('show');
//     Route::post('/{payment}', [EventController::class, 'processPayment'])->name('process');
// });

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
        Route::delete('/image/{image}', [DashboardEventController::class, 'deleteImage'])->name('deleteImage');
    });

    Route::prefix('ticket')->name('ticket.')->group(function () {
        Route::put('/{ticketType}', [TicketTypeController::class, 'update'])->name('update');
        Route::delete('/{ticketType}', [TicketTypeController::class, 'destroy'])->name('destroy');
        Route::post('/', [TicketTypeController::class, 'store'])->name('store');
    });

    Route::prefix('order')->name('orders.')->group(function () {
        Route::get('/', [RecentOrderController::class, 'index'])->name('index');
        Route::get('/{order}', [RecentOrderController::class, 'showOrder'])->name('show');
    });

    //     Route::prefix('organizer')->middleware(['auth', 'role:event-organizer'])->name('organizer.')->group(function () {
    // });

    Route::prefix('admin')->middleware(['auth', 'role:admin|'])->name('admin.')->group(function () {
        Route::prefix('user-management')->name('user-management.')->group(function () {
            Route::get('/', [DashboardAdminController::class, 'userManagement'])->name('index');
            Route::put('/{user}', [DashboardAdminController::class, 'updateUser'])->name('update');
        });
        Route::prefix('event-management')->name('event-management.')->group(function () {
            Route::get('/', [DashboardAdminController::class, 'eventManagement'])->name('index');
            Route::put('/{event}/approve', [DashboardAdminController::class, 'approveEvent'])->name('approve-event');
            Route::put('/{event}/reject', [DashboardAdminController::class, 'rejectEvent'])->name('reject-event');
        });
    });
});

Route::get('/test', [EventController::class, 'getParticipant']);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    // Atas bawaan laravel
    Route::get('/recent-order', [ProfileController::class, 'recentOrder'])->name('recent-order');
});

require __DIR__ . '/auth.php';
require __DIR__ . '/api.php';
