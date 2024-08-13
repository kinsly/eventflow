<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Here we are using Spatie laravel backup to create, clean and schedule backups.
 */
class BackupController extends Controller
{
    
    /**
     * Show all available backup files
     * in ZIP format.
     */
    public function index():Response
    {

        $files = Storage::files('testingbackups');
        return Inertia::render('Backups/Index',[
            'backups'=>$files
        ]);
    }

    /**
     * @Get
     * Download backups
     */
    public function download($fileName)
    {
        return Storage::download("./testingbackups/".$fileName);
    }

    /**
     * @Delete
     * delete selected backup
     */
    public function delete(Request $request)
    {
        Storage::delete("./testingbackups/".$request->fileName);
    }
}
