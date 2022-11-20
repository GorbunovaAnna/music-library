import { createSlice, createAsyncThunk, SerializedError } from '@reduxjs/toolkit';
import { spotifyURL } from "../spotify";
import axios, { AxiosError } from 'axios';
import { getCookie } from '../cookie';
import SpotifyWebApi from 'spotify-web-api-node';


export const fetchMyRecentlyPlayedTracks = createAsyncThunk(
    'myRecentlyPlayedTracks/myRecentlyPlayedTracksStatus',
    async (data, thunkApi) => {

        // const access_token = getCookie('token');
        // const res = await axios.get(`${spotifyURL}/browse/new-releases`, { headers: { 'Authorization': `Bearer ${access_token}` } });
        const spotifyApi = new SpotifyWebApi({
            clientId: process.env.REACT_APP_CLIENT_ID,
          });
        const token = getCookie('token')
        if(token){
            spotifyApi.setAccessToken(token);
            const res = await spotifyApi.getMyRecentlyPlayedTracks();
            spotifyApi.getMyRecentlyPlayedTracks({limit: 8})
            console.log('myrecently',res.body);
            return res.body;
        }
    }
)

interface MyRecentlyPlayedTracksState {
    myRecentlyPlayedTracksState: SpotifyApi.UsersRecentlyPlayedTracksResponse | undefined;
    loading: boolean;
    error: AxiosError | null;
}


const initialState = {
    myRecentlyPlayedTracksState: undefined,
    loading: false,
    error: null,
} as MyRecentlyPlayedTracksState;

export const myRecentlyPlayedTracksSlice = createSlice({
    name: 'releases',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMyRecentlyPlayedTracks.fulfilled, (state, action) => {
            state.myRecentlyPlayedTracksState = action.payload;
            state.error = null;
            state.loading = false;

        }).addCase(fetchMyRecentlyPlayedTracks.rejected, (state, action) => {
            state.error = action.error as AxiosError;
            state.loading = false;
        }).addCase(fetchMyRecentlyPlayedTracks.pending, (state)=>{
            state.loading = true;
        })
    }
})

export default myRecentlyPlayedTracksSlice.reducer;