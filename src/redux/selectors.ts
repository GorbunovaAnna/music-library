import { RootState } from "../store";



export const getNewAlbums = (state: RootState) => state.albums.albums;
export const getNewReleases = (state: RootState) => state.releases.releases;
export const getReleasesLoadingState = (state: RootState) => {
    return state.releases.loading || state.albums.loading;
};