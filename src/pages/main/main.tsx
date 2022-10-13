import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getTokenFromUrl, loginUrl } from "../../spotify";
import { getNewReleases } from "../../redux/selectors";
import { fetchAlbums } from "../../redux/albumsSlice";
import { useAppDispatch } from "../../store";
import { getCookie, setCookie } from "../../cookie";
import { Album } from "../../components/album";

export const Main = () => {
  const dispatch = useAppDispatch();
  const releases = useSelector(getNewReleases);
  

  useEffect(() => {
    dispatch(fetchAlbums());
  }, []);

  return (
    <div className="App">
      
      {releases?.albums?.items.map((el) => (
        // <Album album={el} />
        <img key={el.id} src={el.images[1].url} />
      ))}
    </div>
  );
};
