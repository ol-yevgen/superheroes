import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IAccessToken, ILoginRes, ILoginTypes, IRegistrationTypes, IUserPayload, ILogoutRes } from 'types/AuthTypes';
import { setAccess, setUser } from 'redux/features/authSlice'
import { successToast, errorToast } from 'utils/toast';

const BASE_URL = process.env.REACT_APP_BASE_URL as string;
const userStorage = process.env.REACT_APP_LOCAL_USER as string

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL + 'api/',
    }),
    endpoints: (builder) => ({
        registrationUser: builder.mutation<{}, IRegistrationTypes>({
            query(data) {
                return {
                    url: 'user/registration/',
                    method: 'POST',
                    body: data,
                }
            },
        }),
        loginUser: builder.mutation<ILoginRes, ILoginTypes>({
            query(data) {
                return {
                    url: 'auth/login',
                    method: 'POST',
                    credentials: 'include',
                    body: data,
                }
            },
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    localStorage.setItem(userStorage, JSON.stringify(data.userInfo))
                    dispatch(setAccess(data.accessToken as IAccessToken));
                    dispatch(setUser(data.userInfo as IUserPayload));
                } catch (err) { }
            }
        }),
        refreshLogin: builder.query<IAccessToken, void>({
            query() {
                return {
                    url: 'auth/refresh',
                    credentials: 'include',
                }
            },
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    const userInfo = await JSON.parse(localStorage.getItem(userStorage) as string)
                    if (data && userInfo) {
                        dispatch(setAccess(data.accessToken as IAccessToken));
                        dispatch(setUser(userInfo as IUserPayload));
                    }
                } catch (err) { }
            }
        }),
        logoutUser: builder.mutation<ILogoutRes, void>({
            query() {
                return {
                    url: 'auth/logout',
                    method: 'POST',
                    credentials: 'include'
                }
            },
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setAccess(data.accessToken as IAccessToken))
                    successToast(data.message)
                    localStorage.removeItem(userStorage)
                } catch (err) { }
            }
        }),
    })
});

export const {
    useRegistrationUserMutation,
    useLoginUserMutation,
    useRefreshLoginQuery,
    useLogoutUserMutation,
} = authApi;
