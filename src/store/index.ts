import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer'; // Adjust path as necessary
const store = configureStore({ reducer: rootReducer });
export type { GoBangState } from './reducer';
export default store;
