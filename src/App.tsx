import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import { Login } from "./pages/login/login";
import { Main } from "./pages/main/main";
import { getTokenFromUrl, loginUrl } from "./spotify";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="*" element={ <NotFoundPage/> }/>    */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
