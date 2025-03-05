<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Tighten\Ziggy\Ziggy;

class APIController extends Controller
{
    //
    public function getZiggy(Request $request)
    {
        $ziggy = new Ziggy;
        $routes = $ziggy->toArray();
        $routes['location'] = $request->url();

        return response()->json($routes);
    }
}
