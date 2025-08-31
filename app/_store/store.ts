import { createStore } from "redux";
import { counterReducer } from "./reducer";

export const store = createStore(counterReducer);

// Type for RootState
export type RootState = ReturnType<typeof store.getState>;
