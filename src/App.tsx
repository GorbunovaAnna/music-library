import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import { LoginPage } from "./pages/login-page/login-page";
import { Main } from "./pages/main/index";
import { NotFoundPage } from "./pages/not-found-page";
import { getTokenFromUrl, loginUrl } from "./spotify";
import { PrivateRoute } from "./compound/private-route/index";
import { Header } from "./components/header";

function App() {
  return (
    <>
      <Header></Header>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Main />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/artist/:id" element={<LoginPage />} /> */}
          {/* <Route path="/albums/:id" element={<LoginPage />} /> */}
          {/* https://api.spotify.com/v1/artists/{id}/albums
          And then request the tracks of each album (have a look here):

          https://api.spotify.com/v1/albums/{id}/tracks */}
          <Route path="*" element={ <NotFoundPage/> }/>   
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
