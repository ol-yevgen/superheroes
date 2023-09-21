import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { heroesApi } from './api/heroesApi';
import modalSlice from './features/modalSlice'

export const store = configureStore({
    reducer: {
        [heroesApi.reducerPath]: heroesApi.reducer,
        modalState: modalSlice,
    },
    devTools: process.env.REACT_APP_NODE_ENV === 'development',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat([
        heroesApi.middleware,
    ]),
})

export type TRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;