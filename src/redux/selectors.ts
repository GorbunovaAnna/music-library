import { RootState } from "../store";

export const getMyRecentlyPlayedTracks = (state: RootState) => state.myRecentlyPlayedTracks.myRecentlyPlayedTracksState;
export const getNewReleases = (state: RootState) => state.releases.releases;
export const getUserInfo = (state: RootState) => state.userInfo.userInfo;
export const getMyPlaylists = (state: RootState) => state.myPlaylists.myPlaylists;
export const getPlaylist = (state: RootState) => state.myPlaylists.playlist;
export const getTrack = (state: RootState) => state.player.track;
export const getReleasesLoadingState = (state: RootState) => {
    return state.releases.loading || state.myRecentlyPlayedTracks.loading || state.myPlaylists.loading;
};