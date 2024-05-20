import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Utilisateur from "./Utilisateur/Utilisateur.jsx";
import Compte from "./Utilisateur/Compte.jsx";
import Login from "./auth/Login.jsx";
import Inscription from "./auth/Inscription.jsx";
import Acceuil from "./undefind/Acceuil.jsx";
import "./index.css";
import { UserProvider } from "./context"; //
import InfoPerso from "./Globals/InfoPerso.jsx";
import SuivieDemande from "./Utilisateur/SuivieDemande.jsx";
import Services from "./undefind/Services.jsx";
import Categorie from "./undefind/Categorie.jsx";
import Profil from "./undefind/Profil.jsx";
import Demande from "./Utilisateur/Demande.jsx";
import Updateinfoperso from "./Globals/Updateinfoperso.jsx";
import Notfounde from "./auth/Notfounde.jsx";
import Listservices from "./Globals/Listservices.jsx";
import Listetaches from "./Globals/Listetaches.jsx";
import Ajouterservice from "./Globals/Ajouterservice.jsx";
import UpdateService from "./Globals/UpdateService.jsx";
import DetailService from "./Globals/DetailService.jsx";
import DetailTaches from "./Globals/DetailTaches.jsx";
import Commentaires from "./Utilisateur/Commentaires.jsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/commantaire",
    element: <Commentaires />,
  },
  {
    path: "/inscription",
    element: <Inscription />,
  },
  {
    path: "/acceuil",
    element: <Acceuil />,
  },

  {
    path: "/",
    element: <Acceuil />,
  },
  {
    path: "*",
    element: <Notfounde />,
  },
  {
    path: "/services",
    element: <Services />,
  },
  {
    path: "/service/:categorie",
    element: <Categorie />,
  },
  {
    path: "/profile/:utilisateur_id/:service_id",
    element: <Profil />,
  }
,  
  {
    path: "/Utilisateur",
    element: <Utilisateur />,
    children: [
      {
        path: "/Utilisateur/compte",
        element: <Compte />,
      },
      {
        path: "/Utilisateur/infoperso",
        element: <InfoPerso />,
      },
      {
        path: "/Utilisateur/updateinfo",
        element: <Updateinfoperso />,
      },
      {
        path: "/Utilisateur/suiviedemande",
        element: <SuivieDemande />,
      },
      {
        path: "/Utilisateur/demande/:type/:id/:utilisateur_id",
        element: <Demande />,
      },
      {
        path: "/Utilisateur/Listeservice",
        element: <Listservices />,
      },
      {
        path: "/Utilisateur/Listetaches",
        element: <Listetaches />,
      },
      {
        path: "/Utilisateur/Ajouterservice",
        element: <Ajouterservice />,
      },
      {
        path: "/Utilisateur/UpdateService/:idservice",
        element: <UpdateService />,
      },
      {
        path: "/Utilisateur/DetailService/:idservice",
        element: <DetailService />,
      },
      {
        path: "/Utilisateur/DetailTache/:idtache",
        element: <DetailTaches />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
