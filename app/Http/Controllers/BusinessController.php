<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Business;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class BusinessController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index():Response
    {
        $businesses = Business::whereHas('users',function ($query) {
                        $query->where('user_id', Auth::id()); // Filter users by user_id = 1
                    })->get();

        return Inertia::render('Business/Index',[
            "businesses" => $businesses
        ]);
    }


    /**
     * Store a newly created Business.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|max:255'
        ]);


        $newBusiness= Business::create([
            'name'=>$request->name,
            'role' => 'owner'
        ]);

        $newBusiness->users()->attach(Auth::id());        
        return redirect()->route('business.index');
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id):RedirectResponse
    {
        $request->validate([
            'name' => 'required|max:255'
        ]);
        
        
        $business = Business::whereHas('users',function ($query) {
            $query->where('user_id', Auth::id()); // Filter users by user_id = 1
        })->find($id);

        if($business){
            $business->name=$request->name;
            $business->save();
        }
        return redirect()->route('business.index');
    }

    /**
     * Remove business
     */
    public function delete(string $business_id)
    {
        $business = Business::whereHas('users',function ($query) {
            $query->where('user_id', Auth::id()); // Filter users by user_id = 1
        })->find($business_id);
        
        if (!$business) {
            return redirect()->route('business.index')->withErrors(['error' => 'Business not found']);
        }
        $userOwnsBusiness = $business->users()->where('user_id', Auth::id())->exists();
        
        //Check user own this business
        if($userOwnsBusiness){
            $business->delete();
            return redirect()->route('business.index')->with('success', 'Business deleted successfully');
        }else{
            return redirect()->route('business.index')->withErrors(['error' => 'You do not own this business']);
        }

    }
}
