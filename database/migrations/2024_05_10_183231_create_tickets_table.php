<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->string('ticket_code', 255)->unique();
            $table->foreignUlid('user_id')->constrained();
            $table->foreignId('event_id')->constrained();
            $table->foreignId('order_id')->constrained();
            $table->foreignId('ticket_type_id')->constrained(
                'ticket_types',
                'id'
            );
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};
