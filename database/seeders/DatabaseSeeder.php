<?php

namespace Database\Seeders;

use App\Models\Event;
use App\Models\EventCategory;
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

        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
        $user->assignRole('event-organizer');

        $eventCategories = EventCategory::all();

        $id = $user->id;

        $events = Event::factory(10)->create([
            'user_id' => $id,
        ]);

        $events->each(function ($event) use ($eventCategories) {
            $randomCategories = $eventCategories->random(rand(1, 3));

            $event->categories()->attach($randomCategories->pluck('id'));
        });
    }
}
