import React from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../cookie";

type Props = {
    children: React.ReactElement;
  };
export const PrivateRoute = ({ children }: Props) => {
    const token = getCookie('token');
    return token ? children : <Navigate to="/login" replace />;
}