import { createStore } from "redux";
import combineReducer from '../features/user/combineReducer';

export const store = createStore(combineReducer);
export default store;