<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class UserRolesController extends Controller
{
    /**
     * Show all registered users on the system with their roles
     */
    public function index(): Response
    {
        $users = User::with('roles')->get();
        $roles = Role::where("name", "!=", "Super Admin")->pluck('name')->all();
        
        return Inertia::render('UserRoles/Index',[
            'users' => $users,
            'roles' => $roles 
        ]);
    }


    /**
     * Assigning a role to a selected user
     */

     public function store(Request $request)
     {
        $user = User::find($request->user_id);
        $role = $request->role;
        $user->assignRole($role);

        // $response = User::with('roles')->find($request->user_id);
        // return $response;
        return redirect()->route('userRoles.store')
                         ->withSuccess('New user is added successfully.');

     }

     /**
      * Remove role from a selected user
      */
     public function destroy(Request $request)
     {
        $user = User::find($request->user_id);
        $user->removeRole($request->role);
        return redirect()->route('userRoles.delete');
     }
}
