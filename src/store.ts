import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import releasesSlice from './redux/releasesSlice';
import userInfoSlice from './redux/userSlice';
import myPlaylistsSlice from './redux/myPlaylistsSlice';
import myRecentlyPlayedTracksSlice from './redux/myRecentlyPlayedTracksSlice';
import playerSlice from './redux/playerSlice';
export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
export const store = configureStore({
  reducer: {
    myRecentlyPlayedTracks: myRecentlyPlayedTracksSlice,
    releases: releasesSlice,
    userInfo: userInfoSlice,
    myPlaylists: myPlaylistsSlice,
    player: playerSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch