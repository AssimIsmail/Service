import { useContext, useEffect } from "react";
import { UserContext } from "../context";
import { useNavigate } from "react-router-dom";

const useRequireAuth = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);
};

export default useRequireAuth;
