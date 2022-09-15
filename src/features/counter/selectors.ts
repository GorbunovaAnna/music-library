import { RootState } from "../../store";

export const getCountState = (state: RootState) => state.counter.value;