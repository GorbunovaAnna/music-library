import React from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../cookie";

type Props = {
    children: React.ReactElement;
  };
export const PrivateRoute = ({ children }: Props) => {
    const token = getCookie('token');
    const code = new URLSearchParams(window.location.search).get('code');
    return token || code ? children : <Navigate to="/login" replace />;
}