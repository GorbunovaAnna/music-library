import { createSlice, createAsyncThunk, SerializedError } from '@reduxjs/toolkit';
import { spotifyURL } from "../spotify";
import axios, { AxiosError } from 'axios';
import { getCookie } from '../cookie';


export const fetchNewReleases = createAsyncThunk(
    'releases/releasesStatus',
    async (data, thunkApi) => {

        const access_token = getCookie('token');
        const res = await axios.get(`${spotifyURL}/browse/new-releases`, { headers: { 'Authorization': `Bearer ${access_token}` } });
        if (res.status !== 200) {
            thunkApi.rejectWithValue('error');
        } else {
            return res.data as SpotifyApi.ListOfNewReleasesResponse;
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