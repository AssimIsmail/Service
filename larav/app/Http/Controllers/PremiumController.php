<?php

namespace App\Http\Controllers;

use App\Models\Premium;
use Illuminate\Http\Request;

class PremiumController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $serviceId = $request->query('service_id');
    
    if ($serviceId) {
        $premiums = Premium::where('service_id', $serviceId)->get();
    } else {
        $premiums = Premium::all();
    }
    
        return response()->json($premiums);
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

        $premium = Premium::create($request->all());

        return response()->json($premium, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Premium $premium)
    {
        return response()->json($premium);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Premium $premium)
    {
        $request->validate([
            'service_id' => 'required|integer',
            'prix' => 'required|numeric',
            'description' => 'required|string',
            'durer' => 'required|string',
            'revisions' => 'required|integer',
        ]);

        $premium->update($request->all());

        return response()->json($premium, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Premium $premium)
    {
        $premium->delete();

        return response()->json(null, 204);
    }
}
