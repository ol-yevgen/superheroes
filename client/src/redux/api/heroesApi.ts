import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IHeroFullInfoTypes, IHeroesResponseTypes } from 'types/HeroTypes';

const BASE_URL = process.env.REACT_APP_BASE_URL as string;

interface IUpdateReqData {
    formData: FormData,
    heroId: string
}

export const heroesApi = createApi({
    reducerPath: 'heroesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL + 'api/',
    }),
    tagTypes: ['Heroes', 'Hero'],
    
    endpoints: (builder) => ({

        // GET PAGE OF HEROES
        getHeroes: builder.query<IHeroesResponseTypes, number>({
            query: (page) => ({
                url: `heroes?page=${page}`,
                credentials: 'include',
                mode: 'cors',
            }),
            providesTags: ['Heroes'],
            transformResponse: (result: IHeroesResponseTypes) => result,
        }),
        
        //GET ONE HERO INFO
        getHero: builder.query<IHeroFullInfoTypes, string>({
            query: (id: string) => ({
                url: `hero/${id}`,
                credentials: 'include',
                mode: 'cors',

            }),
            providesTags: ['Hero'],
            transformResponse: (result: IHeroFullInfoTypes) => result,
        }),
        
        //CREATE HERO
        createHero: builder.mutation<{}, FormData>({
            query: (data) => ({
                url: `/hero`,
                credentials: 'include',
                mode: 'cors',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Heroes'],
        }),

        //UPDATE HERO
        updateHero: builder.mutation<any, IUpdateReqData>({
            query: ({ formData, heroId }) => ({
                url: `/hero/${heroId}`,
                credentials: 'include',
                mode: 'cors',
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ['Heroes', 'Hero'],
        }),

        //DELETE HERO
        deleteHero: builder.mutation<any, string>({
            query: (id: string) => ({
                url: `/hero/${id}`,
                credentials: 'include',
                mode: 'cors',
                method: 'DELETE',
            }),
            invalidatesTags: ['Heroes'],
        }),     
    }),
});

export const {

    useGetHeroesQuery,
    useGetHeroQuery,
    useCreateHeroMutation,
    useUpdateHeroMutation,
    useDeleteHeroMutation
} = heroesApi;