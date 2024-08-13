<?php

namespace Database\Factories;

use App\Models\EventMonth;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\EventDay>
 */
class EventDayFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'date'=> fake()->unique()->date(),
            'event_month_id' => EventMonth::factory()
        ];
    }
}
