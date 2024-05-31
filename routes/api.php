<?php

use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;

Route::post('/midtrans/payment_notification', [OrderController::class, 'handlePaymentNotification']);

Route::get('/api/payment-status/{order_code}', [OrderController::class, 'getPaymentStatus'])->name('api.payment-status');
