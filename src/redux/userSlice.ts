import { createSlice, createAsyncThunk, SerializedError } from '@reduxjs/toolkit';
import { spotifyURL } from "../spotify";
import axios, { AxiosError } from 'axios';
import { getCookie } from '../cookie';


export const fetchUserInfo = createAsyncThunk(
    'userInfo/userInfoStatus',
    async (data, thunkApi) => {

        const access_token = getCookie('token');
        const res = await axios.get(`${spotifyURL}/me`, { headers: { 'Authorization': `Bearer ${access_token}` } });
        if (res.status !== 200) {
            thunkApi.rejectWithValue('error');
        } else {
            console.log('userInfo', res.data);
            return res.data as SpotifyApi.CurrentUsersProfileResponse;
        }
    }
)

interface UserInfoState {
    userInfo: SpotifyApi.CurrentUsersProfileResponse | undefined;
    loading: boolean;
    error: AxiosError | null;
}


const initialState = {
    userInfo: undefined,
    loading: false,
    error: null,
} as UserInfoState;

export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
            state.userInfo = action.payload;
            state.error = null;
            state.loading = false;

        }).addCase(fetchUserInfo.rejected, (state, action) => {
            state.error = action.error as AxiosError;
            state.loading = false;
        }).addCase(fetchUserInfo.pending, (state)=>{
            state.loading = true;
        })
    }
})

export default userInfoSlice.reducer;