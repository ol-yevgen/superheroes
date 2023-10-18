import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { authApi } from './api/authApi';
import { heroesApi } from './api/heroesApi';
import modalSlice from './features/modalSlice'
import authSlice from './features/authSlice';

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [heroesApi.reducerPath]: heroesApi.reducer,
        authState: authSlice,
        modalState: modalSlice,
    },
    devTools: process.env.REACT_APP_NODE_ENV === 'development',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat([
        authApi.middleware,
        heroesApi.middleware,
    ]),
})

export type TRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;