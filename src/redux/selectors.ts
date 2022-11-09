import { RootState } from "../store";



export const getRecommendations = (state: RootState) => state.recommendations.recommendations;
export const getNewReleases = (state: RootState) => state.releases.releases;
export const getReleasesLoadingState = (state: RootState) => {
    return state.releases.loading || state.recommendations.loading;
};