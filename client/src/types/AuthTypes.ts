export interface IAccessToken {
    accessToken?: string | null 
}

export type TUserInfo = {
    userName: string,
    userId: string,
    role: string
}

export interface IResMessage {
    message?: string
}

export interface ILogoutRes {
    accessToken?: IAccessToken,
    message: string
}

export interface IUserPayload {
    userInfo?: TUserInfo | null,

}

export interface ILoginRes {
    accessToken?: string | null,
    userInfo?: TUserInfo | null,
    message?: string
}

export interface IUserStateTypes {
    accessToken?: string | null,
    userInfo?: TUserInfo | null,
}

export interface ILoginTypes {
    email: string,
    password: string
}

export interface IRegistrationTypes extends ILoginTypes {
    firstName?: string,
    lastName?: string,
}