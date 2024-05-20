<?php

namespace App\Http\Controllers;

use App\Models\Standard;
use Illuminate\Http\Request;

class StandardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $serviceId = $request->query('service_id');
    
    if ($serviceId) {
        $standards = Standard::where('service_id', $serviceId)->get();
    } else {
        $standards = Standard::all();
    }
        
        return response()->json($standards);
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

        $standard = Standard::create($request->all());

        return response()->json($standard, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Standard $standard)
    {
        return response()->json($standard);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Standard $standard)
    {
        $request->validate([
            'service_id' => 'required|integer',
            'prix' => 'required|numeric',
            'description' => 'required|string',
            'durer' => 'required|string',
            'revisions' => 'required|integer',
        ]);

        $standard->update($request->all());

        return response()->json($standard, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Standard $standard)
    {
        $standard->delete();

        return response()->json(null, 204);
    }
}
