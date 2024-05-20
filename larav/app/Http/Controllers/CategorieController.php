<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Categorie;
use Illuminate\Support\Facades\Storage;

class CategorieController extends Controller
{
    public function index()
    {
        $categories = Categorie::all();
        return response()->json($categories);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'description' => 'nullable|string',
            'categorie' => 'nullable|string',
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images', 'public');
            $request->merge(['image' => $imagePath]);
        }

        $categorie = Categorie::create($request->all());

        return response()->json($categorie, 201);
    }

    public function show($id)
    {
        $categorie = Categorie::findOrFail($id);
        return response()->json($categorie);
    }

    public function update(Request $request, $id)
    {
        $categorie = Categorie::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'description' => 'nullable|string',
            'categorie' => 'nullable|string',
        ]);

        if ($request->hasFile('image')) {
            if ($categorie->image) {
                Storage::disk('public')->delete($categorie->image);
            }

            $imagePath = $request->file('image')->store('images', 'public');
            $request->merge(['image' => $imagePath]);
        }

        $categorie->update($request->all());

        return response()->json($categorie, 200);
    }

    public function destroy($id)
    {
        $categorie = Categorie::findOrFail($id);

        if ($categorie->image) {
            Storage::disk('public')->delete($categorie->image);
        }

        $categorie->delete();

        return response()->json(null, 204);
    }
}
