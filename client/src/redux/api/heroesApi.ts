import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { useNavigate } from 'react-router-dom';
import { setAccess } from 'redux/features/authSlice';
import { IAccessToken } from 'types/AuthTypes';
import { IHeroPageReq, IUpdateReqData, IHeroesResponseTypes, IResData, IAddHeroReq, IHeroFullInfoResponse } from 'types/HeroTypes';
import { errorToast } from 'utils/toast';

const BASE_URL = process.env.REACT_APP_BASE_URL as string;

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
            // transformResponse: (result: IHeroesResponseTypes) => result,
        }),

        //GET ONE HERO INFO
        getHero: builder.query<IHeroFullInfoResponse, IHeroPageReq>({
            query: ({ id, accessToken }) => ({
                url: `hero/${id}`,
                credentials: 'include',
                mode: 'cors',
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }),
            providesTags: ['Hero'],
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data.accessToken !== undefined) {
                        dispatch(setAccess(data.accessToken as IAccessToken));
                    }
                } catch (err) {}
            }
        }),

        //CREATE HERO
        createHero: builder.mutation<IResData, IAddHeroReq>({
            query: ({ formData, accessToken}) => {
                return {
                    url: `/hero`,
                    credentials: 'include',
                    mode: 'cors',
                    method: 'POST',
                    body: formData,
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            },
            invalidatesTags: ['Heroes'],
        }),

        //UPDATE HERO
        updateHero: builder.mutation<IResData, IUpdateReqData>({
            query: ({ formData, id, accessToken }) => ({
                url: `/hero/${id}`,
                credentials: 'include',
                mode: 'cors',
                method: 'PUT',
                body: formData,
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }),
            invalidatesTags: ['Heroes', 'Hero'],
        }),

        //DELETE HERO
        deleteHero: builder.mutation<IResData, IHeroPageReq>({
            query: ({ id, accessToken }) => ({
                url: `/hero/${id}`,
                credentials: 'include',
                mode: 'cors',
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
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