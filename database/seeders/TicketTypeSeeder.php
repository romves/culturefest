<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TicketTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $ticketTypes = [
            ['name' => 'Regular', 'price' => 100000, 'is_seated' => false, 'max_tickets' => 800],
            ['name' => 'VIP', 'price' => 200000, 'is_seated' => false, 'max_tickets' => 800],
            ['name' => 'VVIP', 'price' => 300000, 'is_seated' => false, 'max_tickets' => 800],
        ];

        foreach ($ticketTypes as $ticketType) {
            \App\Models\TicketType::create($ticketType);
        }
    }
}
