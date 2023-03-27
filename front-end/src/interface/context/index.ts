import { IUserLogin } from "../user/userInterface";

export interface AuthProviderData {
    login: (userData: IUserLogin) => void
}