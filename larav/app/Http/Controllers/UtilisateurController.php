<?php

namespace App\Http\Controllers;

use App\Models\Utilisateur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UtilisateurController extends Controller
{
    public function createUser(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'username' => 'required|string|max:255',
                'lastname' => 'string|max:255|nullable',
                'email' => 'required|email|unique:utilisateurs,email',
                'password' => 'required|string|min:6',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Validation error',
                    'errors' => $validator->errors()
                ], 401);
            }

            $imagePath = null;
            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('images', 'public');
            }

            $user = Utilisateur::create([
                'username' => $request->username,
                'lastname' => $request->lastname,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => 'user',
                'image' => $imagePath,
            ]);

            return response()->json([
                'status' => true,
                'message' => 'User created successfully',
                'token' => $user->createToken('API Token')->plainTextToken
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
    public function loginUser(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'email' => 'required|email',
                'password' => 'required|string',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Validation error',
                    'errors' => $validator->errors()
                ], 401);
            }

            if (!Auth::attempt($request->only(['email', 'password']))) {
                return response()->json([
                    'status' => false,
                    'message' => 'Incorrect email or password.',
                ], 401);
            }

            $user = Auth::user();

            return response()->json([
                'status' => true,
                'message' => 'User logged in successfully',
                'token' => $user->createToken('API Token')->plainTextToken
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function index()
    {
        $users = Utilisateur::all();
        return response()->json($users);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'email' => 'required|email|unique:utilisateurs,email',
            'password' => 'required|string|min:6',
            'role' => 'string|max:255|nullable',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 401);
        }

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images', 'public');
        }

        $utilisateur = Utilisateur::create([
            'username' => $request->username,
            'lastname' => $request->lastname,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role ?? 'user',
            'image' => $imagePath,
        ]);

        return response()->json($utilisateur, 201);
    }

    public function show(Utilisateur $utilisateur)
    {
        return response()->json($utilisateur);
    }

    public function update(Request $request, Utilisateur $utilisateur)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'string|max:255',
            'lastname' => 'string|max:255',
            'email' => 'email|unique:utilisateurs,email,' . $utilisateur->id,
            'password' => 'string|min:6|nullable',
            'role' => 'string|max:255|nullable',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 401);
        }
    
        if ($request->hasFile('image')) {
            if ($utilisateur->image) {
                Storage::disk('public')->delete($utilisateur->image);
            }
    
            $imagePath = $request->file('image')->store('images', 'public');
            $utilisateur->image = $imagePath;
        }
    
        $utilisateur->update($request->except(['password', 'image']));
    
        if ($request->has('password') && !empty($request->password)) {
            $utilisateur->password = Hash::make($request->password);
            $utilisateur->save();
        }
    
        return response()->json($utilisateur, 200);
    }
    
    public function destroy(Utilisateur $utilisateur)
    {
        if ($utilisateur->image) {
            Storage::disk('public')->delete($utilisateur->image);
        }

        $utilisateur->delete();

        return response()->json(null, 204);
    }
}
