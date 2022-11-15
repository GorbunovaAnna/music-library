import { RootState } from "../store";

export const getRecommendations = (state: RootState) => state.recommendations.recommendations;
export const getNewReleases = (state: RootState) => state.releases.releases;
export const getUserInfo = (state: RootState) => state.userInfo.userInfo;
export const getMyPlaylists = (state: RootState) => state.myPlaylists.myPlaylists;
export const getReleasesLoadingState = (state: RootState) => {
    return state.releases.loading || state.recommendations.loading;
};