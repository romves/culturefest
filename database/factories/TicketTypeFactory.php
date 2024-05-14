<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TicketType>
 */
class TicketTypeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $ticketTypes = ['Regular', 'VIP', 'Early Bird', 'Student', 'Group'];

        return [
            'name' => $this->faker->randomElement($ticketTypes),
            'price' => $this->faker->randomFloat(2, 50000, 1000000),
            'max_tickets' => $this->faker->numberBetween(50, 1200),
            'is_seated' => $this->faker->boolean,

            'event_id' => '1',
        ];
    }
}
