<?php

namespace Database\Factories;

use App\Models\EventDay;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        
        return [
            'name' => fake()->words(2, true),
            'description'=> fake()->paragraph(3, true),
            'event_day_id' => EventDay::factory()
            
        ];
    }
}
