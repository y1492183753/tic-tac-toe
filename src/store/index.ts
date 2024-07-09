import { configureStore } from '@reduxjs/toolkit';
import goBangReducer from './reducer';
const store = configureStore({ reducer: goBangReducer });
export type { GoBangState } from './reducer';
export default store;
