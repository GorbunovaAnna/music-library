import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IAuthObject } from '../spotify';


const initialState: IAuthObject = {
  access_token: '',
  expires_in: '',
  token_type: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<IAuthObject>)=>{
      state = Object.assign(state, action.payload);
    }
  },
})


export const { setCredentials } = authSlice.actions

export default authSlice.reducer