import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUserStateTypes, IAccessToken, IUserPayload, TUserInfo } from 'types/AuthTypes';

const initialState: IUserStateTypes = {
    accessToken: null,
    userInfo: null
}

const authSlice = createSlice({
    initialState,
    name: 'authSlice',
    reducers: {
        setAccess: (state, action: PayloadAction<IAccessToken>) => {
            state.accessToken = action.payload as string
        },
        setUser: (state, action: PayloadAction<IUserPayload>) => {
            state.userInfo = action.payload as TUserInfo
        }
    }
});

export default authSlice.reducer;

export const { setAccess, setUser } = authSlice.actions;