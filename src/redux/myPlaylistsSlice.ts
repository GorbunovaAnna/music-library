import { spotifyURL } from '../spotify';
import { createSlice, createAsyncThunk, SerializedError } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { getCookie } from '../cookie';
import { useSelector } from 'react-redux';
import { getUserInfo } from './selectors';
import SpotifyWebPlayer from 'react-spotify-web-playback/lib';

// import SpotifyWebApi from 'spotify-web-api-node';

export const fetchMyPlaylists = createAsyncThunk(
    'myPlaylists/myPlaylistsStatus',
    async (data: string, thunkApi) => {
        const access_token = getCookie('token');

        console.log('ewqewq', data)
        const res = await axios.get(`${spotifyURL}/users/${data}/playlists`, { headers: { 'Authorization': `Bearer ${access_token}` } });
        if (res.status !== 200) {
            thunkApi.rejectWithValue('error');
        } else {
            console.log('myPlaylists',res.data);
            return res.data as SpotifyApi.ListOfUsersPlaylistsResponse;
        }

        // const spotifyApi = new SpotifyWebApi
    }
)

interface MyPlaylistsState {
    myPlaylists: SpotifyApi.ListOfUsersPlaylistsResponse | undefined;
    loading: boolean;
    error: AxiosError | null;
}


const initialState = {
    myPlaylists: undefined,
    loading: false,
    error: null,
} as MyPlaylistsState;

export const myPlaylistsSlice = createSlice({
    name: 'myPlaylists',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMyPlaylists.fulfilled, (state, action) => {
            state.myPlaylists = action.payload;
            state.error = null;
            state.loading = false;

        }).addCase(fetchMyPlaylists.rejected, (state, action) => {
            state.error = action.error as AxiosError;
            state.loading = false;
        }).addCase(fetchMyPlaylists.pending, (state)=>{
            state.loading = true;
        })
    }
})

export default myPlaylistsSlice.reducer;