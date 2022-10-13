import { RootState } from "../store";



export const getNewReleases = (state: RootState) => state.albums.albums;