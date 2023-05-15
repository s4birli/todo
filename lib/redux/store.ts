import { createStore, applyMiddleware, Dispatch } from "redux";
import thunk, { ThunkDispatch } from "redux-thunk";
import reducer from "./reducer";
import { TaskAction } from "../types/Task";

export type RootState = ReturnType<typeof reducer>;

export type AppDispatch = ThunkDispatch<RootState, undefined, TaskAction>;

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
