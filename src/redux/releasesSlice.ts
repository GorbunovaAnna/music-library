import { createSlice, createAsyncThunk, SerializedError } from '@reduxjs/toolkit';
import { spotifyURL } from "../spotify";
import axios, { AxiosError } from 'axios';
import { getCookie } from '../cookie';
import SpotifyWebApi from 'spotify-web-api-node';


export const fetchNewReleases = createAsyncThunk(
    'releases/releasesStatus',
    async (data, thunkApi) => {

        // const access_token = getCookie('token');
        // const res = await axios.get(`${spotifyURL}/browse/new-releases`, { headers: { 'Authorization': `Bearer ${access_token}` } });
        const spotifyApi = new SpotifyWebApi({
            clientId: process.env.REACT_APP_CLIENT_ID,
          });
        const token = getCookie('token')
        console.log('reaslsess token', token)
        if(token){
            spotifyApi.setAccessToken(token);
            const res = await spotifyApi.getNewReleases();
            console.log('reeeee', res)
            return res.body as SpotifyApi.ListOfNewReleasesResponse;
        }
    }
)

interface ReleasesState {
    releases: SpotifyApi.ListOfNewReleasesResponse | undefined;
    loading: boolean;
    error: AxiosError | null;
}


const initialState = {
    releases: undefined,
    loading: false,
    error: null,
} as ReleasesState;

export const releasesSlice = createSlice({
    name: 'releases',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchNewReleases.fulfilled, (state, action) => {
            state.releases = action.payload;
            state.error = null;
            state.loading = false;

        }).addCase(fetchNewReleases.rejected, (state, action) => {
            state.error = action.error as AxiosError;
            state.loading = false;
        }).addCase(fetchNewReleases.pending, (state)=>{
            state.loading = true;
        })
    }
})

export default releasesSlice.reducer;