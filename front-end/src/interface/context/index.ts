import { IUserLogin, IUserRegister } from "../user/userInterface";


export interface AuthProviderData {
    login: (userData: IUserLogin) => void
}

export interface RegisterProviderData {
    registerUser: (userData: IUserRegister) => void
}