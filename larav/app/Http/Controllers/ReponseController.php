<?php

namespace App\Http\Controllers;

use App\Models\Reponse;
use Illuminate\Http\Request;

class ReponseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $support_id = $request->query('support_id');
    
        if ($support_id) {
            $reponses = Reponse::where('support_id', $support_id)->get();
        } else {
            $reponses = Reponse::all();
        }
        return response()->json($reponses);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'support_id' => 'required|integer',
            'utilisateur_id' => 'required|string|max:255',
            'description' => 'required|string'
        ]);

        $reponse = Reponse::create($validatedData);
        return response()->json($reponse, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Reponse $reponse)
    {
        return response()->json($reponse);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Reponse $reponse)
    {
        $validatedData = $request->validate([
            'support_id' => 'integer',
            'utilisateur_id' => 'string|max:255',
            'description' => 'string'
        ]);

        $reponse->update($validatedData);
        return response()->json($reponse);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reponse $reponse)
    {
        $reponse->delete();
        return response()->json(null, 204);
    }
}
