<?php

namespace App\Http\Controllers;

use App\Models\Demande;
use Illuminate\Http\Request;

class DemandeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $userId = $request->query('utilisateur_id');
        $devId = $request->query('dev');
        
        $query = Demande::query();
        
        if ($userId) {
            $query->where('utilisateur_id', $userId);
        }
        
        if ($devId) {
            $query->where('dev', $devId);
        }
        
        $demandes = $query->get();
        
        return response()->json($demandes);
    }
    

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name_dev' => 'required',
            'prix' => 'required',
            'type' => 'required',
            'durer' => 'required',
            'revisions' => 'required',
            'description' => 'required',
            'mes_besoin' => 'required',
            'utilisateur_id' => 'required',
            'dev' => 'required',
            'demandeur' => 'required',
            'status' => 'required',
        ]);

        $demande = Demande::create($request->all());
        return response()->json($demande, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Demande $demande)
    {
        return response()->json($demande);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Demande $demande)
    {
        
        $demande->update($request->all());
        return response()->json($demande, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Demande $demande)
    {
        $demande->delete();
        return response()->json(null, 204);
    }
}
