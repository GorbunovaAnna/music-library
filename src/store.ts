import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import albumsSlice from './redux/albumsSlice';
import authSlice from './redux/authSlice';
export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
export const store = configureStore({
  reducer: {
    auth: authSlice,
    albums: albumsSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch