import { RootState } from "../store";

export const getAuthCredentials = (state: RootState) => state.auth;