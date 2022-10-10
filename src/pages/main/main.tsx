import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getTokenFromUrl, loginUrl } from "../../spotify";
import { getAuthCredentials, getNewReleases } from "../../redux/selectors";
import { setCredentials } from "../../redux/authSlice";
import { fetchAlbums } from "../../redux/albumsSlice";
import { useAppDispatch } from "../../store";
import { getCookie, setCookie } from "../../cookie";

export const Main = () => {
  const authState = useSelector(getAuthCredentials);
  const releases = useSelector(getNewReleases);
  const res = getTokenFromUrl();
  // const dispatch = useDispatch<AppDispatch>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!authState.access_token.length) {
      dispatch(setCredentials(res));
      // document.cookie = `token2=${res.access_token} max-age=10`;
      // setCookie("token", res.access_token, { "max-age": 10 });
      // !getCookie('token')?.length
    }
    dispatch(fetchAlbums());
    // axios.get(`${spotifyURL}/browse/new-releases`, {headers: {'Authorization': `Bearer ${res.access_token || authState.access_token}`}})
    //   .then((res)=>{
    //     console.log(res);
    //   })
  }, []);
  
  return (
    <div className="App">
      <a href={loginUrl}>Sign in with spotify</a>
      <span style={{ color: "#fff" }}>{authState.access_token}</span>
      {releases?.albums?.items.map((el) => (
        // <Album album={el} />
        <img key={el.id} src={el.images[1].url} />
      ))}
    </div>
  );
};
