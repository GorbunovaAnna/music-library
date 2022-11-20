import { createSlice, createAsyncThunk, SerializedError } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { getCookie } from '../cookie';
import SpotifyWebApi from 'spotify-web-api-node';


export interface DataTrackFromPlaylist {
    id: string;
    uri: string
}

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
        const res = await spotifyApi.getUserPlaylists();
        return res.body;
    }
)
export const fetchMyPlaylistById = createAsyncThunk(
    'playlistById/playlistByIdStatus',
    async (id: string = '', thunkApi) => {
        const test = await spotifyApi.getMySavedTracks();
        console.log('1111', test)
        const res = await spotifyApi.getPlaylist(id);
        return res.body;
    }
)
export const postTrackToPlaylist = createAsyncThunk(
    'postTrackToPlaylist/postTrackToPlaylistStatus',
    async (data: DataTrackFromPlaylist, thunkApi) => {
        const res = await spotifyApi.addTracksToPlaylist(data.id, [data.uri]);
        return res.body;
    }
)

export const fetchDeleteTrackFromPlaylist = createAsyncThunk(
    'fetchDeleteTrackFromPlaylist/fetchDeleteTrackFromPlaylistStatus',
    async (data: DataTrackFromPlaylist, thunkApi) => {
        const res = await spotifyApi.removeTracksFromPlaylist(data.id, [{ uri: data.uri }]);
        return data.uri;
    }
)

export const addPlaylistToSpotify = createAsyncThunk(
    'addPlaylist/addPlaylistStatus',
    async (playlistName: string, thunkApi) => {
        const res = await spotifyApi.createPlaylist(playlistName);
        return res.body;
    }
)

export const deletePlaylistToSpotify = createAsyncThunk(
    'deletePlaylist/deletePlaylistStatus',
    async (id: string, thunkApi) => {
        const spotifyApi = new SpotifyWebApi({
            clientId: process.env.REACT_APP_CLIENT_ID,
        });
        const token = getCookie('token')
        if (token) {
            spotifyApi.setAccessToken(token);
        }
        const res = await spotifyApi.unfollowPlaylist(id);
        console.log(res);

        if (res.statusCode !== 200) {
            thunkApi.rejectWithValue('error');
        } else {
            console.log('delete playlist', res);
            return id;
        }

    }
)

interface MyPlaylistsState {
    myPlaylists: SpotifyApi.ListOfUsersPlaylistsResponse | undefined;
    loading: boolean;
    playlist: SpotifyApi.SinglePlaylistResponse | undefined;
    error: AxiosError | null;
}


const initialState = {
    myPlaylists: undefined,
    playlist: undefined,
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
        }).addCase(fetchMyPlaylists.pending, (state) => {
            state.loading = true;
        }).addCase(addPlaylistToSpotify.fulfilled, (state, action) => {
            if (state.myPlaylists?.items) {
                state.myPlaylists.items = [action.payload, ...state.myPlaylists.items]
            }
        }).addCase(deletePlaylistToSpotify.fulfilled, (state, action) => {
            const filteredPlaylists = state.myPlaylists?.items.filter(el => el.id !== action.payload);
            if (state.myPlaylists?.items) {
                state.myPlaylists.items = filteredPlaylists || [];
            }
        }).addCase(fetchMyPlaylistById.fulfilled, (state, action) => {
            state.playlist = action.payload;
        }).addCase(postTrackToPlaylist.fulfilled, (state, action) => {
            console.log('action payload', action.payload)
        }).addCase(fetchDeleteTrackFromPlaylist.fulfilled, (state, action) => {
            const filterPlaylist = state.playlist?.tracks.items.filter(el => el.track?.uri !== action.payload);
            if (state.playlist?.tracks.items) {
                state.playlist.tracks.items = filterPlaylist || [];
            }
        })
    }
})

// export const { addPlaylist } = myPlaylistsSlice.actions;
export default myPlaylistsSlice.reducer;