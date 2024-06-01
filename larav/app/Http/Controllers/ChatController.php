<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $demande_id = $request->query('demande_id');
    
        if ($demande_id) {
            $chats = Chat::where('demande_id', $demande_id)->get();
        } else {
            $chats = Chat::all();
        }
        return response()->json($chats);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'demande_id' => 'required',
            'utilisateur_id' => 'required',
            'message' => 'required',
        ]);

        $chat = Chat::create($request->all());
        return response()->json($chat, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Chat $chat)
    {
        return response()->json($chat);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Chat $chat)
    {
        $request->validate([
            'demande_id' => 'required',
            'utilisateur_id' => 'required',
            'message' => 'required',
        ]);

        $chat->update($request->all());
        return response()->json($chat, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Chat $chat)
    {
        $chat->delete();
        return response()->json(null, 204);
    }
}
