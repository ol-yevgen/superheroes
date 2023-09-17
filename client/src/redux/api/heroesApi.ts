import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getHeroes } from 'redux/features/heroesSlice';
import { getHero } from 'redux/features/heroSlice';
import { IHeroShortTypes, IHeroFullInfoTypes } from 'types/HeroTypes';
import { successToast, errorToast } from 'utils/toast'

const BASE_URL = process.env.REACT_APP_BASE_URL as string;

export const heroesApi = createApi({
    reducerPath: 'heroesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL + 'api/',
    }),
    endpoints: (builder) => ({
        getHeroes: builder.query<IHeroShortTypes[], null>({
            query: () => ({
                url: 'heroes',
                credentials: 'include',
                mode: 'cors'
            }),
            transformResponse: (result: IHeroShortTypes[]) => result,
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(getHeroes(data));
                } catch (err) {
                    errorToast('Something went wrong')
                }
            }
        }),
        getHero: builder.query<IHeroFullInfoTypes, string>({
            query: (id: string) => ({
                url: `heroes/${id}`,
                credentials: 'include',
                mode: 'cors'
            }),
            transformResponse: (result: IHeroFullInfoTypes) => result,
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(getHero(data));
                } catch (err) {
                    errorToast('Something went wrong')
                }
            }
        }),
    }),
});

export const {
    useGetHeroesQuery,
    useGetHeroQuery  
} = heroesApi;