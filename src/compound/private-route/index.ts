import React from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../cookie";

// type Props = {
//     // title: string;
//     children?: React.ReactNode;
      
//   };

export const PrivateRoute = ({ children }: any // ?????????????????
    ) => {
    const token = getCookie('token');
    const navigate = useNavigate();

    // return token ? children : <Navigate to="/" />;
    return token ? children : navigate("/");
}