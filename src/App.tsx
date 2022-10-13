import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import { LoginPage } from "./pages/login-page/login-page";
import { Main } from "./pages/main/main";
import { getTokenFromUrl, loginUrl } from "./spotify";
import { PrivateRoute } from './compound/private-route/index';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <PrivateRoute>
            <Main />
          </PrivateRoute>
        } />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="*" element={ <NotFoundPage/> }/>    */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
