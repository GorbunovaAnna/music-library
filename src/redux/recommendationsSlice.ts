import { createSlice, createAsyncThunk, SerializedError } from '@reduxjs/toolkit';
import { spotifyURL } from "../spotify";
import axios, { AxiosError } from 'axios';
import { getCookie } from '../cookie';

export const fetchRecommendations = createAsyncThunk(
    'recommendations/recommendationsStatus',
    async (data, { getState, rejectWithValue }) => {
        const access_token = getCookie('token');
        const res = await axios.get(`${spotifyURL}/me/top/artists`, { headers: { 'Authorization': `Bearer ${access_token}` } });
        if (res.status !== 200) {
            rejectWithValue('error');
        } else {
            console.log('Recommendations', res.data)
            return res.data as SpotifyApi.RecommendationsFromSeedsResponse;
        }
    }
)
interface RecommendationsState {
    recommendations: SpotifyApi.RecommendationsFromSeedsResponse | undefined;
    loading: boolean;
    error: AxiosError | null;
}
const initialState = {
    recommendations: undefined,
    loading: false,
    error: null,
} as RecommendationsState;

export const recommendationsSlice = createSlice({
    name: 'recommendations',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRecommendations.fulfilled, (state, action) => {
            //@ts-ignore
            console.log('extra reducers, fulfilled, state: ', state, '\naction', action);
            state.recommendations = action.payload;
            state.error = null;

        }).addCase(fetchRecommendations.rejected, (state, action) => {
            console.log('fetch Recommendations', state, action);
            state.error = action.error as AxiosError;
        })
    }
})

export default recommendationsSlice.reducer;