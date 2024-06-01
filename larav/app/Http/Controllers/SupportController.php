<?php

// app/Http/Controllers/SupportController.php
namespace App\Http\Controllers;

use App\Models\Support;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class SupportController extends Controller
{
    public function index()
    {
        return response()->json(Support::all());
    }

    public function store(Request $request)
    {
        Log::info('Incoming request data:', $request->all());

        $request->validate([
            // 'utilisateur_id' => 'required|exists:users,id',
            // 'raison' => 'required|string|max:255',
            // 'description' => 'required|string',
        ]);

        try {
            $support = Support::create($request->all());
            Log::info('Support created successfully:', ['support' => $support]);

            return response()->json($support, 201);
        } catch (\Exception $e) {
            Log::error('Error creating support:', ['exception' => $e->getMessage()]);

            return response()->json([
                'status' => false,
                'message' => 'Internal Server Error',
            ], 500);
        }
    }

    public function show($id)
    {
        $support = Support::findOrFail($id);
        return response()->json($support);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'utilisateur_id' => 'required|exists:users,id',
            'raison' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $support = Support::findOrFail($id);
        $support->update($request->all());

        return response()->json($support);
    }

    public function destroy($id)
    {
        $support = Support::findOrFail($id);
        $support->delete();

        return response()->json(null, 204);
    }
}
