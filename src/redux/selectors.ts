import { RootState } from "../store";

export const getAuthCredentials = (state: RootState) => state.auth;

export const getNewReleases = (state: RootState) => state.albums.albums;