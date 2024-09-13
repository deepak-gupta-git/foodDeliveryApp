import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../Store/authStore";
import { toast } from "react-toastify";

export const Logout = () => {

  const { LogoutUser } = useAuth();

  useEffect(() => {
    LogoutUser();
  }, [LogoutUser]);

  return <Navigate to="/login" />
};
