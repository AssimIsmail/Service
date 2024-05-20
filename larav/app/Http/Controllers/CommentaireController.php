<?php

namespace App\Http\Controllers;

use App\Models\Commentaire;
use Illuminate\Http\Request;

class CommentaireController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $serviceId = $request->query('service_id');

        if ($serviceId) {
            $commentaires = Commentaire::where('service_id', $serviceId)->get();
        } else {
            $commentaires = Commentaire::all();
        }

        return response()->json($commentaires);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $commentaire = Commentaire::create($request->all());
        return response()->json($commentaire, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Commentaire $commentaire)
    {
        return response()->json($commentaire);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Commentaire $commentaire)
    {
        $commentaire->update($request->all());
        return response()->json($commentaire, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Commentaire $commentaire)
    {
        $commentaire->delete();
        return response()->json(null, 204);
    }
}
