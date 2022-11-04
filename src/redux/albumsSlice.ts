import { createSlice, createAsyncThunk, SerializedError } from '@reduxjs/toolkit';
import { spotifyURL } from "../spotify";
import axios, { AxiosError } from 'axios';
import { getCookie } from '../cookie';

export const fetchNewAlbums = createAsyncThunk(
    'albums/albumsStatus',
    async (data, { getState, rejectWithValue }) => {
        const access_token = getCookie('token');
        const res = await axios.get(`${spotifyURL}/artists/{id}/albums`, { headers: { 'Authorization': `Bearer ${access_token}` } });
        if (res.status !== 200) {
            rejectWithValue('error');
        } else {
            console.log('!!!', res.data)
            return res.data as SpotifyApi.ListOfNewReleasesResponse;
        }
    }
)
interface AlbumsState {
    albums: SpotifyApi.ListOfNewReleasesResponse | undefined;
    loading: boolean;
    error: AxiosError | null;
}
const initialState = {
    albums: undefined,
    loading: false,
    error: null,
} as AlbumsState;

export const albumsSlice = createSlice({
    name: 'albums',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchNewAlbums.fulfilled, (state, action) => {
            //@ts-ignore
            console.log('extra reducers, fulfilled, state: ', state, '\naction', action);
            state.albums = action.payload;
            state.error = null;

        }).addCase(fetchNewAlbums.rejected, (state, action) => {
            console.log('fetch rejecteddddd', state, action);
            state.error = action.error as AxiosError;
        })
    }
})

export default albumsSlice.reducer;