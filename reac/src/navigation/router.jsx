import { createBrowserRouter } from "react-router-dom";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Home from "../welcome/Home";
import Notfounde from "../notfounde/Notfounde";
import Profile from "../profile/Profile";
import Category_Service from "../services/Category_Service";
import Profile_category from "../services/Profile_category";
import Create_request from "../request/Create_request";
import Followed from "../request/Followed";
import Personal_info from "../personal/Personal_info";
import Personal_update from "../personal/Personal_update";
import Service_list from "../services/service_list";
import Tasks_ask from "../request/Tasks _ask";
import Create_service from "../services/Create_service";
import Update_service from "../services/Update_service";
import Detail_tasks from "../request/Detail_tasks";
import Certification_Experience from "../personal/Certification_Experience";
import Create_Certification from "../personal/Create_Certification";
import Create_Experience from "../personal/Create_Experience";
import Modify_experience from "../personal/Modify_experience";
import Modify_Certification from "../personal/Modify_Certification";
import A_propos from "../welcome/A_propos";
import Gestion_services from "../admin/Gestion_services";
import Support from "../admin/Support";
import Utilisateur from "../admin/Utilisateur";
import Create_categorie from "../categorie/Create_categorie";
import Update_categorie from "../categorie/Update_categorie";
import Support_page from "../admin/Support_page";
import Suivie_plaine from "../admin/Suivie_plaine";
import Suivie_support from "../admin/Suivie_support";
import Support_plaine from "../admin/Support_plaine";
import Chat_request from "../request/Chat_request";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",
    element: <Home />,
  },

  {
    path: "/",
    element: <Home />,
  },
  {
    path: "*",
    element: <Notfounde />,
  },
  {
    path: "/categories",
    element: <Category_Service />,
  },
  {
    path: "/Profile_category/:categorie",
    element: <Profile_category />,
  },
  {
    path: "/profile/:utilisateur_id/:service_id",
    element: <Profile />,
  },
  // ,{
  //     path: "/compte",
  //     element: <Compte />,
  //   },
  {
    path: "/Personal_info",
    element: <Personal_info />,
  },
  {
    path: "/Personal_update",
    element: <Personal_update />,
  },
  {
    path: "/Followed",
    element: <Followed />,
  },
  ,
  {
    path: "/request/:type/:id/:utilisateur_id",
    element: <Create_request />,
  },
  {
    path: "/Service_list",
    element: <Service_list />,
  },
  {
    path: "/Tasks_ask",
    element: <Tasks_ask />,
  },
  {
    path: "/Create_service",
    element: <Create_service />,
  },
  {
    path: "/Update_service/:id",
    element: <Update_service />,
  },
  {
    path: "/Detail_tasks/:id",
    element: <Detail_tasks />,
  },
  {
    path: "/Certification_Experience",
    element: <Certification_Experience />,
  },
  {
    path: "/Create_Certification",
    element: <Create_Certification />,
  },
  {
    path: "/Create_Experience",
    element: <Create_Experience />,
  },
  {
    path: "/Modify_experience/:id",
    element: <Modify_experience />,
  },
  {
    path: "/Modify_Certification/:id",
    element: <Modify_Certification />,
  },
  {
    path: "/A_propos",
    element: <A_propos />,
  },
  {
    path: "/Gestion_services",
    element: <Gestion_services />,
  },
  {
    path: "/Support",
    element: <Support />,
  },
  {
    path: "/Utilisateur",
    element: <Utilisateur />,
  },
  {
    path: "/Create_categorie",
    element: <Create_categorie />,
  },
  {
    path: "/Update_categorie/:id",
    element: <Update_categorie />,
  },
  {
    path: "/Support_page",
    element: <Support_page />,
  },
  {
    path: "/Suivie_plaine/:id",
    element: <Suivie_plaine />,
  },
  {
    path: "/Suivie_support",
    element: <Suivie_support/>,
  }, {
    path: "/Support_plaine/:id",
    element: <Support_plaine />,
  }, {
    path: "/Chat_request/:id",
    element: <Chat_request />,
  },
]);
