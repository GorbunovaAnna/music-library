import SpotifyWebApi from "spotify-web-api-node";
import useAuth from "./useAuth";

export const useSpotifyApi = () => {
  const access_token = useAuth();
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.REACT_APP_CLIENT_ID,
  });
  if (access_token) {
    spotifyApi.setAccessToken(access_token);
  }
  return spotifyApi;
};
