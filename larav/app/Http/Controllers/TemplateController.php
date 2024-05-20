<?php

namespace App\Http\Controllers;

use App\Models\Template;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TemplateController extends Controller
{
    public function index(Request $request)
    {
        $serviceId = $request->query('service_id');

        if ($serviceId) {
            $templates = Template::where('service_id', $serviceId)->get();
        } else {
            $templates = Template::all();
        }

        return response()->json($templates);
    }

    public function store(Request $request)
    {
        // Valider les données de la requête
        $request->validate([
            'utilisateur_id' => 'required|integer',
            'service_id' => 'required|integer',
            'images.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
    
        // Handle image upload
        $uploadedImages = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                // Modifiez le chemin de stockage pour enregistrer les images dans public/images
                $imagePath = $image->store('images', 'public');
                $uploadedImages[] = $imagePath;
            }
        }
    
        // Créer un nouveau template pour chaque image
        $templates = [];
        foreach ($uploadedImages as $imagePath) {
            $template = new Template();
            $template->utilisateur_id = $request->utilisateur_id;
            $template->service_id = $request->service_id;
            $template->image = $imagePath;
            $template->save();
            $templates[] = $template;
        }
    
        return response()->json($templates, 201);
    }
        public function show(Template $template)
    {
        return response()->json($template);
    }

    public function update(Request $request, Template $template)
    {
        // Valider les données de la requête
        $request->validate([
            'utilisateur_id' => 'required|integer',
            'service_id' => 'required|integer',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            // Ajoutez d'autres règles de validation si nécessaire
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            // Supprimer l'ancienne image
            if ($template->image) {
                Storage::disk('public')->delete($template->image);
            }

            // Stocker la nouvelle image
            $imagePath = $request->file('image')->store('images', 'public');
            $request->merge(['image' => $imagePath]);
        }

        $template->update($request->all());

        return response()->json($template, 200);
    }

    public function destroy(Template $template)
    {
        // Supprimer l'image associée
        if ($template->image) {
            Storage::disk('public')->delete($template->image);
        }

        $template->delete();

        return response()->json(null, 204);
    }
}
