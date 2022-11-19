import { useSpotifyApi } from './../hooks/useSpotifyApi';
import { spotifyURL } from '../spotify';
import { createSlice, createAsyncThunk, SerializedError } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { getCookie } from '../cookie';
import { useSelector } from 'react-redux';
import { getUserInfo } from './selectors';
import SpotifyWebPlayer from 'react-spotify-web-playback/lib';
import SpotifyWebApi from 'spotify-web-api-node';

// import SpotifyWebApi from 'spotify-web-api-node';
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.REACT_APP_CLIENT_ID,
});
const token = getCookie('token')
if (token) {
    spotifyApi.setAccessToken(token);
}

export const fetchMyPlaylists = createAsyncThunk(
    'myPlaylists/myPlaylistsStatus',
    async (id: string = '', thunkApi) => {
        // const access_token = getCookie('token');
        const res = await spotifyApi.getUserPlaylists();
        return res.body;
    }
)

export const addPlaylistToSpotify = createAsyncThunk(
    'addPlaylist/addPlaylistStatus',
    async (playlistName: string, thunkApi) => {
        // const access_token = getCookie('token');
        const res = await spotifyApi.createPlaylist(playlistName);
        return res.body;
    }
)

export const deletePlaylistToSpotify = createAsyncThunk(
    'deletePlaylist/deletePlaylistStatus',
    async (id: string, thunkApi) => {
        // const access_token = getCookie('token');
        const spotifyApi = new SpotifyWebApi({
            clientId: process.env.REACT_APP_CLIENT_ID,
        });
        const token = getCookie('token')
        if (token) {
            spotifyApi.setAccessToken(token);
        }
        const res = await spotifyApi.unfollowPlaylist(id);
        console.log(res);

        // const res = await axios.get(`${spotifyURL}/users/${id}/playlists`, { headers: { 'Authorization': `Bearer ${access_token}` } });
        if (res.statusCode !== 200) {
            thunkApi.rejectWithValue('error');
        } else {
            console.log('delete playlist', res);
            return id;
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
        // addPlaylist: (state , action) => {
        //     state.myPlaylists?.items.push(action.payload);
        // }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMyPlaylists.fulfilled, (state, action) => {
            state.myPlaylists = action.payload;
            state.error = null;
            state.loading = false;

        }).addCase(fetchMyPlaylists.rejected, (state, action) => {
            state.error = action.error as AxiosError;
            state.loading = false;
        }).addCase(fetchMyPlaylists.pending, (state) => {
            state.loading = true;
        }).addCase(deletePlaylistToSpotify.fulfilled, (state, action) => {
            console.log('action payload', action.payload)
            // state.myPlaylists = state.myPlaylists?.items.filter(el=> el.id !== action.payload)
        })
    }
})

// export const { addPlaylist } = myPlaylistsSlice.actions;
export default myPlaylistsSlice.reducer;