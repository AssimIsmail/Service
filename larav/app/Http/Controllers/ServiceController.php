<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        
        $userId = $request->query('utilisateur_id');
        
        if ($userId) {
            $services = Service::where('utilisateur_id', $userId)->get();
        } else {
            $services = Service::all();
        }
        return response()->json($services);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    // Validate the request data
    $request->validate([
        'utilisateur_id' => 'required|integer',
        'categorie_id' => 'required|integer',
        'description' => 'required|string',
        'prixmoyen' => 'required|numeric',
       // 'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
    ]);

    // Handle image upload
    if ($request->hasFile('image')) {
        $imagePath = $request->file('image')->store('images', 'public');
        $request->merge(['image' => $imagePath]);
    }

    // Create a new service
    $service = Service::create($request->all());

    return response()->json($service, 201);
}


    /**
     * Display the specified resource.
     */
    public function show(Service $service)
    {
        return response()->json($service);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Service $service)
    {
        // Validate the request data
        $request->validate([
            'utilisateur_id' => 'required|integer',
            'categorie_id' => 'required|integer',
            'description' => 'required|string',
            'prixmoyen' => 'required|numeric',
        //     'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
         ]);
    
        // // Handle image upload
        // if ($request->hasFile('image')) {
        //     // Delete the old image
        //     if ($service->image) {
        //         Storage::disk('public')->delete($service->image);
        //     }
    
        //     // Store the new image
        //     $imagePath = $request->file('image')->store('images', 'public');
        //     $request->merge(['image' => $imagePath]);
        // }
    
        // Update the service details
        $service->update($request->all());
    
        return response()->json($service, 200);
    }
    
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Service $service)
    {
        // Delete the associated image
        if ($service->image) {
            Storage::disk('public')->delete($service->image);
        }
    
        // Delete the service
        $service->delete();
    
        return response()->json(null, 204);
    }
    
}
