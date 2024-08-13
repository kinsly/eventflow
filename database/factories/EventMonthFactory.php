<?php

namespace Database\Factories;

use App\Models\EventYear;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\EventMonth>
 */
class EventMonthFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'month' =>fake()->month(),
            'event_year_id'=> EventYear::factory()
        ];
    }
}
