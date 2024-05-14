<?php

namespace Database\Seeders;

use App\Models\Event;
use App\Models\EventCategory;
use App\Models\TicketType;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(RoleSeeder::class);
        $this->call(EventCategorySeeder::class);
        // $this->call(TicketTypeSeeder::class);

        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
        $user->assignRole('event-organizer');

        $id = $user->id;

        $events = Event::factory(10)->create([
            'user_id' => $id,
        ]);

        $events->each(function ($event) {
            $ticketTypeCount = rand(1, 3);
            $event->ticketTypes()->saveMany(TicketType::factory($ticketTypeCount)->make(
                [
                    'event_id' => $event->id,
                    'max_tickets' => $event->max_participants / $ticketTypeCount,
                ]
            ));

            $randomCategories = EventCategory::inRandomOrder()->limit(3)->get();

            $event->categories()->attach($randomCategories->pluck('id'));
        });
    }
}
