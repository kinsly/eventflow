<?php

namespace Database\Seeders;

use App\Models\Event;
use App\Models\EventDay;
use App\Models\EventMonth;
use App\Models\EventYear;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Testing\Fakes\Fake;

class TestEventsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create events for user1 test user for year 2024
        $user = User::where('name','user1')->first();
        $this->createEventsForYear($user, 2024);
        $this->createEventsForYear($user, 2025);
      
    }

    function createEventsForYear($user, $yearValue) {
        // Create only one year for one user
        $year = EventYear::factory()->create([
            'user_id' => $user->id,
            'year' => $yearValue
        ]);
    
        // Create several months for the above year
        $monthNumbers = [];
        for ($i = 1; $i <= 12; $i++) {
            $monthNumbers[] = sprintf("%02d", $i);
        }

        shuffle($monthNumbers);
        
        $months = EventMonth::factory()->count(12)->create([
            'event_year_id' => $year->id,
            'month' => function () use (&$monthNumbers){
                return array_shift($monthNumbers);
            }
        ]);
    
        //Create days for months
        foreach ($months as $month) {
            // $daysInMonth = range(1, cal_days_in_month(CAL_GREGORIAN, (int)$month->month, $yearValue));
            // shuffle($daysInMonth);
            // $usedDays = []; // Reset used days for each month
            $daysNumbers = [];
            for ($i = 1; $i <= 29; $i++) {
                $daysNumbers[] = sprintf("%02d", $i);
            }
            shuffle($daysNumbers);
            $days = EventDay::factory()->count(5)->create([
                'event_month_id' => $month->id,
                'date' => function () use (&$yearValue, &$month, &$daysNumbers){
                        
                        $day = array_shift($daysNumbers);
                        return $yearValue.'-'.$month->month.'-'.$day;
                    }
            ]);
    
            // Create events for every day created.
            foreach ($days as $day) {
                $events = Event::factory()->count(3)->create([
                    'event_day_id' => $day->id
                ]);
            }
        }
    }
}
