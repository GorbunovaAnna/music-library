import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import { LoginPage } from "./pages/login-page/login-page";
import { ArtistPage } from "./pages/artist-page";
import { AlbumPage } from "./pages/album-page";
import { Main } from "./pages/main/index";
import { NotFoundPage } from "./pages/not-found-page";
import { PrivateRoute } from "./compound/private-route/index";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { MyPlaylistsPage } from './pages/my-playlists-page/index';
import { PlaylistPage } from "./pages/playlist-page";

function App() {
  const code = new URLSearchParams(window.location.search).get('code');
  
  return (
    <>
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route
            path="/"
            element={
             <PrivateRoute>

               <Main code={code || ''} />
             </PrivateRoute>
             
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/artist/:id" element={<PrivateRoute><ArtistPage /></PrivateRoute>} />
          <Route path="/album/:id" element={<PrivateRoute><AlbumPage /></PrivateRoute>} />
          <Route path="/playlists/" element={<PrivateRoute><MyPlaylistsPage /></PrivateRoute>} />
          <Route path="/playlist/:id" element={<PrivateRoute><PlaylistPage /></PrivateRoute>} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer code={code || ''}/>
      </BrowserRouter>
    </>
  );
}

export default App;
