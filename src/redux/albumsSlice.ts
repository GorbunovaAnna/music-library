import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { SpotifyApi } from "spotify-api";
import { getTokenFromUrl, spotifyURL } from "../spotify";
import axios from 'axios';
import { RootState } from '../store';

// const authState = useSelector(getAuthCredentials);
const res = getTokenFromUrl();

export const fetchAlbums = createAsyncThunk(
    'albums/albumsStatus',
    async (data, { getState, rejectWithValue }) => {
        const { auth: { access_token } } = getState() as RootState;
        try {
            const res = await axios.get(`${spotifyURL}/browse/new-releases`, { headers: { 'Authorization': `Bearer ${access_token}` } });
            if (res.status !== 200) {
                rejectWithValue('error');
            }else{
                console.log('axiosres', res.data)
                return res.data as SpotifyApi.ListOfNewReleasesResponse;
            }
        } catch (e) {
            rejectWithValue(e);
        }

    }
)

interface AlbumsState {
    albums: SpotifyApi.ListOfNewReleasesResponse | undefined;
    loading: 'pending' | 'succeeded' | 'error';
    errors: string;
}


const initialState = {
    albums: {},
    loading: 'pending',
    errors: '',
} as AlbumsState;

export const albumsSlice = createSlice({
    name: 'albums',
    initialState,
    reducers: {
        // addAlbums: (state, action) => {

        // }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAlbums.fulfilled, (state, action) => {
            //@ts-ignore
            console.log('extra reducers, fulfilled, state: ', state, '\naction', action);
            state.albums = action.payload;

        }).addCase(fetchAlbums.rejected, (state, action) => {
            console.log('fetch rejecteddddd', state, action);
            state.errors = 'error';
        })
    }
})

export default albumsSlice.reducer;