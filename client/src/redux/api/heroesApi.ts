import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getHeroes, getHero, createHero, updateHero, deleteHero } from 'redux/features/heroesSlice';
import { IHeroFullInfoTypes, IHeroesResponseTypes } from 'types/HeroTypes';
import { successToast, errorToast } from 'utils/toast'

const BASE_URL = process.env.REACT_APP_BASE_URL as string;

interface IUpdateReqData {
    data: FormData,
    id: string
}

export const heroesApi = createApi({
    reducerPath: 'heroesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL + 'api/',
    }),
    endpoints: (builder) => ({
        // GET PAGE OF HEROES
        getHeroes: builder.query<IHeroesResponseTypes, number>({
            query: (page: number) => ({
                url: `heroes?page=${page}`,
                credentials: 'include',
                mode: 'cors',
            }),
            transformResponse: (result: IHeroesResponseTypes) => result,
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled ;
                    dispatch(getHeroes(data.allHeroesShort));
                } catch (err) {
                    errorToast('Something went wrong')
                }
            }
        }),

        //GET ONE HERO INFO
        getHero: builder.query<IHeroFullInfoTypes, string>({
            query: (id: string) => ({
                url: `hero/${id}`,
                credentials: 'include',
                mode: 'cors',

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
        
        //CREATE HERO
        createHero: builder.mutation<{}, FormData>({
            query: (data) => ({
                url: `/hero`,
                credentials: 'include',
                mode: 'cors',
                method: 'POST',
                body: data
            }),
            // transformResponse: (result: FormData) => result,
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const {data} = await queryFulfilled;
                    // dispatch(createHero(data));
                } catch (err) {
                    errorToast('Please, fill up all required fields')
                }
            }
        }),

        //UPDATE HERO
        updateHero: builder.mutation<{}, IUpdateReqData>({
            query: ({data, id}) => ({
                url: `/hero/${id}`,
                credentials: 'include',
                mode: 'cors',
                method: 'PATCH',
                body: data
            }),
            transformResponse: (result: FormData) => result,
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(updateHero(data));
                } catch (err) {
                    errorToast('Please, fill up all required fields')
                }
            }
        }),

        //DELETE HERO
        deleteHero: builder.mutation<any, string>({
            query: (id: string) => ({
                url: `/hero/${id}`,
                credentials: 'include',
                mode: 'cors',
                method: 'DELETE',
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    dispatch(deleteHero(data.id as string));
                } catch (err) {
                    errorToast('Please, fill up all required fields')
                }
            }
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