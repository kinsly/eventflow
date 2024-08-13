<?php

namespace App\Http\Controllers;

use App\Models\Business;
use App\Models\Event;
use App\Models\EventDay;
use App\Models\EventMonth;
use App\Models\EventPayment;
use App\Models\EventYear;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Inertia\Response;

class EventController extends Controller
{
     /**
     * List all available tasks
     * $filter = id of the business. null mean personal account.
     */
    public function index(Request $request, $year = null,$business_id = null):Response
    {   
        //Set current year if year is null
        if($year === null){  $year = date("Y");}

        // Add selected business id and year to session.
        if($business_id !== null) { $request->session()->put('selected_business', $business_id); 
        }else{
            $request->session()->put('selected_business', null);}

        if($year !== null) { $request->session()->put('selected_year', $year); 
        }
        
        /**
         * Here we are using -1 instead of null. Because we need to pass only integers. Null is NAN.
         * That's why -1 is passed and later converted to null
         */
        if($business_id == -1) $business_id=null;

        $allEvents = EventYear::with([
            'months' => function ($query) use ($business_id) {
                $query->with(['days' => function($query) use ($business_id) {
                        $query->orderBy('date', 'asc')->whereHas('events', function($query) use ($business_id) {
                            $query->where('business_id', $business_id);
                        })->with('events');
                    }])->orderBy('month','asc')
                    ->whereHas('days.events', function ($query) use ($business_id) {
                         $query->where('business_id', $business_id);
                    });
            }
        ])
        ->where('user_id', Auth::id())
        ->where('year',$year)
        ->get();
        
        return Inertia::render('Event/Index',[
            'allEvents' => $allEvents,
            'business_id'=>$business_id
        ]);
    }
    
    /**
     * Show form to add Event
     */
    public function addTask($business_id=null):Response
    {
        return Inertia::render('Event/Add',[
            'business_id' => $business_id
        ]);
    }

    /**
     * Store user created event or task
     */
    public function storeTask(Request $request):RedirectResponse
    {
        $dateParts = explode('-', $request->date);
        $year = (int)$dateParts[0];
        $month = (int)$dateParts[1];

        $request->validate([
            'name' => 'required|max:255',
            'date' => 'required',
            'cost'=> 'nullable|numeric|regex:/^\d+(\.\d{1,2})?$/'
        ]);

        // Check event year exists for user
        $eventYear = EventYear::where('year',$year)->where('user_id', Auth::id())->first();
        if(!$eventYear){
            $eventYear = EventYear::create([
                'year' => $year,
                'user_id' => Auth::id()
            ]);
        }
        // Check Event month exists
        $eventMonth = EventMonth::where('month',$month)->where('event_year_id', $eventYear->id)->first();
        if(!$eventMonth){
            $eventMonth = EventMonth::create([
                'month' => $month,
                'event_year_id' => $eventYear->id
            ]);
        }

        // Check Event date exists
        $eventDate = EventDay::where('date',$request->date)->where('event_month_id', $eventMonth->id)->first();
        if(!$eventDate){
            $eventDate = EventDay::create([
                'date' => $request->date,
                'event_month_id'=> $eventMonth->id
            ]);
        }
        if($request->business_id){
            //Check user has permissions to given business.
            $business = Business::whereHas('users',function ($query) {
                $query->where('user_id', Auth::id()); // Filter users by user_id = 1
            })->find($request->business_id);

            if($business)
            {  //Create new event for business.
                $event = Event::create([
                    'name' => $request->name,
                    'description' => $request->description,
                    'start_time' => $request->start_time,
                    'end_time' => $request->end_time,
                    'all_day' => $request->all_day,
                    'cost' => $request->cost,
                    'telephone_1' => $request->telephone_1,
                    'telephone_2' => $request->telephone_2,
                    'event_day_id'=>$eventDate->id,
                    'business_id'=>$request->business_id
                ]);
            }else{
                return abort('403');
            }

            
        }else{
            // Create event for personal account
            $event = Event::create([
                'name' => $request->name,
                'description' => $request->description,
                'start_time' => $request->start_time,
                'end_time' => $request->end_time,
                'all_day' => $request->all_day,
                'cost' => $request->cost,
                'telephone_1' => $request->telephone_1,
                'telephone_2' => $request->telephone_2,
                'event_day_id'=>$eventDate->id
            ]);
        }
        

        /**Add event deposits if set */
        foreach ($request->payments as $key => $payment) {
            $deposit = $payment["deposit"];
            $date = $payment["date"];
            EventPayment::create([
                'event_id' => $event->id,
                'deposit' => $deposit,
                'date'=>$date
            ]);            
        }
        
        return redirect()->route('events',[$year,$request->business_id])->with('success', 'New event added!');
    }

    

    /**
     * Show selected event details
     */
    public function showEvent($event_id)
    {
        $event = Event::with(['day.month.year'])
              ->with('payments')
              ->where('id', $event_id)
              ->whereHas('day.month.year', function ($query) {
                    $query->where('user_id', Auth::id());
                })
              ->first();
        
        if (!$event) {
            abort(404, 'Not Found');
        }

        
        return Inertia::render('Event/Show',[
            'event'=> $event
        ]);
    }

    /**
     * Show Edit form for event
     */
    public function editEvent($event_id):Response
    {
        $event = Event::with(['day.month.year'])
                ->with('payments') 
                ->where('id', $event_id)
                ->whereHas('day.month.year', function ($query) {
                    $query->where('user_id', Auth::id());
                })
                ->first();

        if (!$event) {
            abort(404, 'Not Found');
        }
        return Inertia::render('Event/Edit',[
            'event'=> $event
        ]);
    }

    /**
     * Update selected Event
     */
    public function updateEvent(Request $request)
    {
        $request->validate([
            'name' => 'required|max:255',
            'date' => 'required',
            'cost'=> 'nullable|numeric|regex:/^\d+(\.\d{1,2})?$/'
        ]);
        
        $event = Event::with(['day.month.year'])
              ->where('id', $request->event_id)
              ->whereHas('day.month.year', function ($query) {
                    $query->where('user_id', Auth::id());
                })
              ->first();
       if($event){
        // Update
        $event->name = $request->name;
        $event->description = $request->description;
        $event->start_time =  $request->start_time;
        $event->end_time =  $request->end_time;
        $event->all_day =  $request->all_day;
        $event->cost = $request->cost;
        $event->telephone_1 = $request->telephone_1;
        $event->telephone_2 = $request->telephone_2;
        
         /**Add event deposits if set */
        foreach ($request->payments as $key => $payment) {
            $deposit = $payment["deposit"];
            $date = $payment["date"];
            $payment_id = isset($payment["id"]) ? $payment["id"] : '';
            
            // Do not save empty deposits
            if(empty($deposit)){break;}

            $eventPayment = null;
            if($payment_id)
            {
                $eventPayment = EventPayment::find($payment_id);
            }
            
            if(!$eventPayment){
                EventPayment::create([
                    'event_id' => $event->id,
                    'deposit' => $deposit,
                    'date'=>$date
                ]);  
            }else{
                $eventPayment->deposit = $deposit;
                $eventPayment->date = $date;
                $eventPayment->save();
            }
                      
        }
        
        //Create new day, month and year if date is changed
        if($request->date !== $event->day->date){

            $dateParts = explode('-', $request->date);
            $year = (int)$dateParts[0];
            $month = (int)$dateParts[1];

            // Check event year exists
            $eventYear = EventYear::where('year',$year)->where('user_id', Auth::id())->first();
            if(!$eventYear){
                $eventYear = EventYear::create([
                    'year' => $year,
                    'user_id' => Auth::id()
                ]);
            }
            // Check Event month exists
            $eventMonth = EventMonth::where('month',$month)->where('event_year_id', $eventYear->id)->first();
            if(!$eventMonth){
                $eventMonth = EventMonth::create([
                    'month' => $month,
                    'event_year_id' => $eventYear->id
                ]);
            }

            // Check Event date exists
            $eventDate = EventDay::where('date',$request->date)->where('event_month_id', $eventMonth->id)->first();
            if(!$eventDate){
                $eventDate = EventDay::create([
                    'date' => $request->date,
                    'event_month_id'=> $eventMonth->id
                ]);
            }
            // updating event to another new date
            $event->event_day_id = $eventDate->id;
            $event->save();
        }else{
            // update event on same date
            $event->save();
        }
       }
        
        return redirect()->route('events.edit',[$request->event_id])->with('success', 'Event updated!');
    }

    /**
     * Delete selected Event
     */
    public function deleteEvent($event_id)
    {
        $event = Event::with(['day.month.year'])
              ->where('id', $event_id)
              ->whereHas('day.month.year', function ($query) {
                    $query->where('user_id', Auth::id());
                })
              ->first();

        if ($event) {
            $event->delete();
        } 
        return redirect()->route('events')->with('success', 'Event deleted !');
    }

    /**
     * Mark Event is completed
     */
    public function completeEvent(Request $request)
    {
        $request->validate([
            'event_id' => 'required|max:255',
        ]);

        $event = Event::with(['day.month.year'])
                        ->where('id', $request->event_id)
                        ->whereHas('day.month.year', function ($query) {
                            $query->where('user_id', Auth::id());
                        })
                        ->first();
        $event->completed = true;
        $event->save();

        return back()->with('success', 'Event completed');
    }


    /**
     * Undo completed event 
     */
    public function undoCompleteEvent(Request $request)
    {
        $request->validate([
            'event_id' => 'required|max:255',
        ]);

        $event = Event::with(['day.month.year'])
                        ->where('id', $request->event_id)
                        ->whereHas('day.month.year', function ($query) {
                            $query->where('user_id', Auth::id());
                        })
                        ->first();
        $event->completed = false;
        $event->save();

        return back()->with('success', 'Event undo completed');
    }

    /**
     * Removing event payement
     */

    public function removePayment(Request $request)
    {
        $payment_id = $request->id;
        if($payment_id){
            EventPayment::destroy($payment_id);
        }
        return back();
    }
}
