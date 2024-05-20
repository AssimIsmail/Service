import React, { useContext } from "react";
import Navbaruser from "./Navbaruser";
import { UserContext } from "../context";
import useRequireAuth from "../auth/UseRequireAuth";
import InfoPerso from "../Globals/InfoPerso";

const Compte = () => {
  const { user } = useContext(UserContext);
  useRequireAuth();
  

  return (
    <div className="h-screen flex bg-gray-100">
      <div className="flex-1">
        <InfoPerso />
      </div>
     {/* <Navbaruser />*/} 
    </div>
  );
};

export default Compte;
