<?php

namespace App\Http\Controllers;

use App\Models\Basic;
use Illuminate\Http\Request;

class BasicController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
{
    $serviceId = $request->query('service_id');
    
    if ($serviceId) {
        $Basic = Basic::where('service_id', $serviceId)->get();
    } else {
        $Basic = Basic::all();
    }
    
    // Returning the Basic data as a JSON response
    return response()->json($Basic);
}


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // This method could be used to show a form for creating a new resource,
        // but since you're building APIs, you won't need this.
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'service_id' => 'required|integer',
            'prix' => 'required|numeric',
            'description' => 'required|string',
            'durer' => 'required|string',
            'revisions' => 'required|integer',
        ]);

        $basic = Basic::create($request->all());

        return response()->json($basic, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Basic $basic)
    {
        return response()->json($basic);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Basic $basic)
    {
        // This method could be used to show a form for editing a resource,
        // but since you're building APIs, you won't need this.
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Basic $basic)
    {
        $request->validate([
            'service_id' => 'required|integer',
            'prix' => 'required|numeric',
            'description' => 'required|string',
            'durer' => 'required|string',
            'revisions' => 'required|integer',
        ]);

        $basic->update($request->all());

        return response()->json($basic, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Basic $basic)
    {
        $basic->delete();

        return response()->json(null, 204);
    }
}
