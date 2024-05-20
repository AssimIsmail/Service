<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UtilisateurController;

Route::get('/utilisateurs', [UtilisateurController::class, 'index']);
Route::post('/utilisateurs', [UtilisateurController::class, 'store']);
Route::get('/utilisateurs/{utilisateur}', [UtilisateurController::class, 'show']);
Route::put('/utilisateurs/{utilisateur}', [UtilisateurController::class, 'update']);
Route::delete('/utilisateurs/{utilisateur}', [UtilisateurController::class, 'destroy']);

use App\Http\Controllers\CategorieController;


Route::get('/categories', [CategorieController::class, 'index']);
Route::post('/categories', [CategorieController::class, 'store']);
Route::get('/categories/{id}', [CategorieController::class, 'show']);
Route::put('/categories/{id}', [CategorieController::class, 'update']);
Route::delete('/categories/{id}', [CategorieController::class, 'destroy']);

use App\Http\Controllers\ServiceController;


Route::get('/services', [ServiceController::class, 'index']);
Route::post('/services', [ServiceController::class, 'store']);
Route::get('/services/{service}', [ServiceController::class, 'show']);
Route::put('/services/{service}', [ServiceController::class, 'update']);
Route::delete('/services/{service}', [ServiceController::class, 'destroy']);


use App\Http\Controllers\CertificatController;

Route::get('/certificats', [CertificatController::class, 'index']);
Route::post('/certificats', [CertificatController::class, 'store']);
Route::get('/certificats/{certificat}', [CertificatController::class, 'show']);
Route::put('/certificats/{certificat}', [CertificatController::class, 'update']);
Route::delete('/certificats/{certificat}', [CertificatController::class, 'destroy']);

use App\Http\Controllers\ExperienceController;

Route::get('/experiences', [ExperienceController::class, 'index']);
Route::post('/experiences', [ExperienceController::class, 'store']);
Route::get('/experiences/{experience}', [ExperienceController::class, 'show']);
Route::put('/experiences/{experience}', [ExperienceController::class, 'update']);
Route::delete('/experiences/{experience}', [ExperienceController::class, 'destroy']);

use App\Http\Controllers\TemplateController;

Route::get('/templates', [TemplateController::class, 'index']); 
Route::post('/templates', [TemplateController::class, 'store']);
Route::get('/templates/{template}', [TemplateController::class, 'show']); 
Route::put('/templates/{template}', [TemplateController::class, 'update']); 
Route::delete('/templates/{template}', [TemplateController::class, 'destroy']);

use App\Http\Controllers\BasicController;
use App\Http\Controllers\PremiumController;
use App\Http\Controllers\StandardController;

// Routes for BasicController
Route::get('/basics', [BasicController::class, 'index']);
Route::post('/basics', [BasicController::class, 'store']);
Route::get('/basics/{basic}', [BasicController::class, 'show']);
Route::put('/basics/{basic}', [BasicController::class, 'update']);
Route::delete('/basics/{basic}', [BasicController::class, 'destroy']);

// Routes for PremiumController
Route::get('/premiums', [PremiumController::class, 'index']);
Route::post('/premiums', [PremiumController::class, 'store']);
Route::get('/premiums/{premium}', [PremiumController::class, 'show']);
Route::put('/premiums/{premium}', [PremiumController::class, 'update']);
Route::delete('/premiums/{premium}', [PremiumController::class, 'destroy']);

// Routes for StandardController
Route::get('/standards', [StandardController::class, 'index']);
Route::post('/standards', [StandardController::class, 'store']);
Route::get('/standards/{standard}', [StandardController::class, 'show']);
Route::put('/standards/{standard}', [StandardController::class, 'update']);
Route::delete('/standards/{standard}', [StandardController::class, 'destroy']);

use App\Http\Controllers\DemandeController;


Route::get('/demandes', [DemandeController::class, 'index']);
Route::get('/demandes/{demande}', [DemandeController::class, 'show']);
Route::post('/demandes', [DemandeController::class, 'store']);
Route::put('/demandes/{demande}', [DemandeController::class, 'update']);
Route::delete('/demandes/{demande}', [DemandeController::class, 'destroy']);
Route::get('/demandes/utilisateur', [DemandeController::class, 'demandesUtilisateur']);

Route::post('/register', [UtilisateurController::class, 'createUser']);
Route::post('/login', [UtilisateurController::class, 'loginUser']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

use App\Http\Controllers\CommentaireController;

Route::get('/commentaires', [CommentaireController::class, 'index']);
Route::post('/commentaires', [CommentaireController::class, 'store']);
Route::get('/commentaires/{commentaire}', [CommentaireController::class, 'show']);
Route::put('/commentaires/{commentaire}', [CommentaireController::class, 'update']);
Route::delete('/commentaires/{commentaire}', [CommentaireController::class, 'destroy']);
