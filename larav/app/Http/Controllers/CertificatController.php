<?php

namespace App\Http\Controllers;

use App\Models\Certificat;
use Illuminate\Http\Request;

class CertificatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $certificats = Certificat::all();
        return response()->json($certificats);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'utilisateur_id' => 'required',
            'description' => 'required',
        ]);

        $certificat = Certificat::create($request->all());
        return response()->json($certificat, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Certificat $certificat)
    {
        return response()->json($certificat);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Certificat $certificat)
    {
        $request->validate([
            'utilisateur_id' => 'required',
            'description' => 'required',
        ]);

        $certificat->update($request->all());
        return response()->json($certificat, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Certificat $certificat)
    {
        $certificat->delete();
        return response()->json(null, 204);
    }
}
