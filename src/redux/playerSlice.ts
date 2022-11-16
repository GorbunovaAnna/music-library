import { createSlice } from '@reduxjs/toolkit'

interface PlayerState {
    track: string
}

const initialState: PlayerState = {
    track: "",
}

export const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        addTrack: (state , action) => {
            state.track = action.payload;
        }
    }
})

export const { addTrack } = playerSlice.actions;
export default playerSlice.reducer;